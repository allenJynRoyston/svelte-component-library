<script lang='ts'>
  //---------------------------
  import {tick, onMount, getContext} from 'svelte'
  import Chance from 'chance'
  import {Button, Form, UserFetcher} from '../index'   
  import {CreateComment, CreatePost, CreateUser} from '../../js/create'

  //---------------------------
  export let viewerId = null
  export let friendStatus = null;

  //---------------------------
  const indexdb = getContext('indexdb')
  const loggedIn = getContext('loggedIn')
  const myDetails = getContext('myDetails') 
  const chance = new Chance();

  let isReady = false;
  let loginAsProps = {}
  let mimicAsProps = {}
  let friendStatusProps = {}
  let viewer = null
  let busy = false
  //---------------------------

  //---------------------------
  onMount(async() => {
    await setupMockUsers()

    const options = await setupMockUsers() || []    

    loginAsProps = {
      formData: [
        {
          renderAs: 'select', 
          label: 'You are:',     
          key: 'loginAs',      
          value: 0,
          defaultOption: 'Select an option',
          options: options.map(x => {
            x.title = `${x.firstName} ${x.lastName} | ${x._id}`
            return x
          }),
          onInitFilter: (val, options) => {                  
            return loggedIn ? options.find(x => x._id === myDetails._id) : null
          },        
          onChange: (val) => {    
            window.localStorage.setItem('me', JSON.stringify(val))     
            location.reload()
          },     
        }  
      ]
    }  

    mimicAsProps = {
      formData: [
        {
          renderAs: 'select', 
          label: 'Viewing:',     
          key: 'loginAs',      
          value: 0,
          defaultOption: 'Select an option',
          options: options.map(x => {
            x.title = `${x.firstName} ${x.lastName} | ${x._id}`
            return x
          }),
          onInitFilter: (val, options) => {                 
            return viewerId ? options.find(x => x._id === viewerId) : null
          },        
          onChange: (val) => {    
            window.localStorage.setItem('viewing', JSON.stringify(val))     
            location.reload()
          },     
        }  
      ]
    }

    friendStatusProps = {
      formData: [
        {
          renderAs: 'select', 
          label: 'We are:',     
          key: 'loginAs',      
          value: 0,
          defaultOption: 'Select an option',
          options: [
            {title: 'friends'}, 
            {title: 'not_friends'}, 
            {title: 'pending_request'}
          ],
          onInitFilter: (val, options) => {                  
            return loggedIn ? options.find(x => x.title === friendStatus)  : null
          },        
          onChange: (val) => {    
            window.localStorage.setItem('friendstatus', JSON.stringify(val))     
            location.reload()
          },     
        }  
      ]
    }      

    await tick()
    isReady = true
  })

  //---------------------------
  const setupMockUsers = () => {
    return new Promise(async(resolve) => {
      // @ts-ignore
      resolve(await indexdb.getAll('users'))    
    })
  }

  const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  const returnRandomNumber = (dataset) => {
    const random = chance.integer({ min: 0, max: dataset.length - 1})
    return random
  }  

  const returnRandom = (dataset) => {
    const random = chance.integer({ min: 0, max: dataset.length - 1})
    return dataset[random]
  }

  const returnRandomData = ({type, amount}) => {
    let data = []

    for(let i = 0; i < amount; i++){
      switch(type){
        case 'users':
          data.push({
            _id: `u_${chance.fbid()}`,
            name: chance.name()
          })
        break
        case 'images':
          data.push({
            _id: `i_${chance.fbid()}`,
            imageSrc: `https://picsum.photos/50/50?random=${chance.integer({ min: 1, max: 155 })}`,            
          })
        break         
        case 'posts':
          data.push({
            _id: `p_${chance.fbid()}`,
            content: chance.paragraph({ sentences: 2 }),
            updatedOn: randomDate(new Date(2012, 0, 1), new Date()) 
          })
        break  
        case 'comments':
          data.push({
            _id: `c_${chance.fbid()}`,
            content: chance.paragraph({ sentences: 1 }),
            updatedOn: new Date()
          })
        break                        
      }      
    }

    return data
  }

  const addTestData = async() => {
    busy = true
    return new Promise( async(resolved) => {
      let userData = returnRandomData({type: 'users', amount: 10})
      let postData = returnRandomData({type: 'posts', amount: 500})
      let imageData = returnRandomData({type: 'images', amount: 120})
      let commentData = returnRandomData({type: 'comments', amount: 2000})

      commentData = commentData.map(x => {
        x.refId = chance.coin() > 'heads' ? returnRandom(postData)._id : returnRandom(commentData)._id
        x.authorId = returnRandom(userData)._id
        return x
      })        
      
      let promises = [];

      imageData.forEach(x=> {        
        const {_id, imageSrc} = x  

        const authorId = returnRandom(userData)._id
        const comments = commentData.filter(x => x.refId === _id)

        //--------------------------------------------
        promises.push(new Promise( async(resolve) => {
          // @ts-ignore
          await indexdb.add('images', {
            _id, 
            version: 0,
            imageSrc,
            comments: {
              total: comments.length,
              myComments: {
                count: comments.filter(x => x.authorId === authorId).map(x => x._id).length,
                cids: comments.filter(x => x.authorId === authorId).map(x => x._id)
              },               
              allComments: {
                count: comments.filter(x => x.authorId !== authorId).map(x => x._id).length,
                cids: comments.filter(x => x.authorId !== authorId).map(x => x._id)
              }              
            },             
            metadata: {}      
          }, true)     
          resolve(null)
        }))   
      })
      //--------------------------------------------
      
      //--------------------------------------------
      userData.forEach(x => {        
        const {name} = x
        promises.push(new Promise( async(resolve) => {

          let user = {  
            ...x,  
            firstName: name.split(' ')[0],
            lastName:  name.split(' ')[1] || 'Smith',    
            username: name.replace(/\s+/g, '_').toLowerCase(),
            imageId: returnRandom(imageData)._id,
            emotionImageSrc: chance.coin() > 'heads' ? {
              happy: '/images/emotions/happy-test.png',
              anger: '/images/emotions/anger-test.png',
              sad: '/images/emotions/sad-test.png',
              shocked: '/images/emotions/shocked-test.png',
            } : null                           
          }

          await CreateUser(user, indexdb)

          resolve(null)
        }))   
      }) 
      //--------------------------------------------

      //--------------------------------------------
      commentData.forEach(x => {                
        const {_id, authorId} = x

        const comments = commentData.filter(x => x.refId === _id)

        promises.push(new Promise( async(resolve) => {
          let comment = {
            ...x,           
            comments: {
              total: comments.length,
              myComments: {
                count: 0,
                cids: []
              },               
              allComments: {
                count: comments.filter(x => x.authorId !== authorId).map(x => x._id).length,
                cids: comments.filter(x => x.authorId !== authorId).map(x => x._id)
              }              
            },     
            emotes: {
              myEmote: chance.coin() > 'heads' ? 'like' : 'dislike',
              like: {
                count: returnRandomNumber(userData),
                userIds: []
              },
              dislike: {
                count: returnRandomNumber(userData),
                userIds: []
              },
              angry: {
                count: returnRandomNumber(userData),
                userIds: []
              },
              sad: {
                count: returnRandomNumber(userData),
                userIds: []
              },
              wink: {
                count: returnRandomNumber(userData),
                userIds: []
              }                                
            },              
          }

          await CreateComment(comment, indexdb)
    
          resolve(null)
        }))        
      })  
      //--------------------------------------------     

      //--------------------------------------------     
      postData.forEach(x => {               
        const {_id} = x;   

        const authorId = returnRandom(userData)._id
        const comments = commentData.filter(x => x.refId === _id)

        promises.push(new Promise( async(resolve) => {

          let post = {
            ...x, 
            authorId,  
            comments: {
              total: comments.length,
              myComments: {
                count: comments.filter(x => x.authorId === authorId).map(x => x._id).length,
                cids: comments.filter(x => x.authorId === authorId).map(x => x._id)
              },               
              allComments: {
                count: comments.filter(x => x.authorId !== authorId).map(x => x._id).length,
                cids: comments.filter(x => x.authorId !== authorId).map(x => x._id)
              }              
            }, 
            emotes: {
              myEmote: chance.coin() > 'heads' ? 'plus' : 'minus',
              plus: {
                count: returnRandomNumber(userData),
                userIds: []
              },
              minus: {
                count: returnRandomNumber(userData),
                userIds: []
              },              
              like: {
                count: returnRandomNumber(userData),
                userIds: []
              },
              dislike: {
                count: returnRandomNumber(userData),
                userIds: []
              },
              angry: {
                count: returnRandomNumber(userData),
                userIds: []
              },
              sad: {
                count: returnRandomNumber(userData),
                userIds: []
              },
              wink: {
                count: returnRandomNumber(userData),
                userIds: []
              }                                
            },
          }

          await CreatePost(post, indexdb)

          resolve(null)
        }))
        //--------------------------------------------        
    
      }) 

      Promise.all(promises).then(async() => {  
        // @ts-ignore
        let postCount = await indexdb.count('posts')
        // @ts-ignore
        let userCount = await indexdb.count('users')
        // @ts-ignore
        let imageCount = await indexdb.count('images')
        // @ts-ignore
        let commentCount = await indexdb.count('comments')        

        alert(`${userCount} users created | ${postCount} posts created | ${imageCount} images created | ${commentCount} comments created.`)        
        location.reload()  
        resolved(null)                    
      })      

    })
  }  

  const logOut = () => {
    window.localStorage.removeItem('me')             
    // window.localStorage.removeItem('viewing')             
    location.reload()
  }

  const clearTestData = () => {
    // @ts-ignore
    indexdb.clear('posts')
    // @ts-ignore
    indexdb.clear('images')
    // @ts-ignore
    indexdb.clear('users')
    // @ts-ignore
    indexdb.clear('comments')    
    
    window.localStorage.clear()         
          
    alert("clear test data.")
    location.reload()
  }
  //---------------------------


  //--------------------------- FUNCTIONS  
  const appendUserData = (user) => {  
    viewer = user
  }   
  //---------------------------

  //--------------------------- STYLES
  const buttonStyle = 'margin-right: 10px; padding: 5px'
  const formStyle = 'margin-right: 5px'
</script>


{#if viewerId} 
  <UserFetcher id={viewerId} onComplete={appendUserData} />
{/if}

{#if isReady}
  <div class='testutility-container'>
    <div class='testutility-container__item'>
      <Button disabled={busy} onClick={addTestData} style={buttonStyle}> Add test data </Button>
      <Button disabled={busy} onClick={clearTestData} style={buttonStyle}> Clear test data </Button>  
      <Button disabled={busy} onClick={logOut} style={buttonStyle}> Logout </Button>  
    </div>
    <hr>

    <div class='testutility-container__item'>
      <Form {...loginAsProps} showButton={false} style={formStyle}/>    
      <Form {...mimicAsProps} showButton={false} style={formStyle}/>    
      <Form {...friendStatusProps} showButton={false} style={formStyle}/>    
    </div>


    <p>
      {#if loggedIn && myDetails}
        Logged in as <strong>{`${myDetails.firstName} ${myDetails.lastName}`}</strong>
      {:else}
        Not logged in
      {/if}
    
      {#if viewer}
        and viewing  <strong>{`${viewer.firstName} ${viewer.lastName}`}</strong>
      {/if}
    </p>

    <p>
      <small>Friendship status: <strong>{!!friendStatus ? `${friendStatus} 🤗` : "Not friends"}</strong></small>    
    </p>
    

    <hr>
    

  </div>
{/if}

<style lang='scss'>
  .testutility-container{
    width: 100%;

    &__item{
      display: flex; justify-content: flex-start      
    }

    p{
      text-align: center
    }

  }
</style>