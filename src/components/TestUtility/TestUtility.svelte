<script lang='ts'>
  //---------------------------
  import {tick, onMount, getContext} from 'svelte'
  import {Button, Form, UserFetcher} from '../index'  
  import axios from 'axios';

  //---------------------------
  export let viewerId = null
  export let friendStatus = null;

  //---------------------------
  const indexdb = getContext('indexdb')
  const loggedIn = getContext('loggedIn')
  const myDetails = getContext('myDetails')

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
    const random = Math.floor(Math.random() * dataset.data.length);
    return random
  }  

  const returnRandom = (dataset) => {
    const random = Math.floor(Math.random() * dataset.data.length);
    return dataset.data[random]
  }

  const returnRandomComments = (comments) => {

  }

  const randomId = () => {
    return Math.random().toString(36).substring(7);
  }
  
  const addTestData = async(users = 10, posts = 100, images = 200, comments = 500) => {
    busy = true
    return new Promise( async(resolved) => {
      let uData = await axios.get('https://jsonplaceholder.typicode.com/users') // 10 max
      let pData = await axios.get('https://jsonplaceholder.typicode.com/posts') // 100 max      
      let iData = await axios.get('https://jsonplaceholder.typicode.com/photos') // 5000 max
      let cData = await axios.get('https://jsonplaceholder.typicode.com/comments') // 100 max

      // fill fields to make it a compatable dataset
      pData.data = pData.data.slice(0, posts).map(x => {
        x._id = `p_${randomId()}`
        return x
      })      

      uData.data = uData.data.slice(0, users).map(x => {
        x._id = `u_${randomId()}`
        return x
      })    

      iData.data = iData.data.slice(0, images).map(x => {
        x._id = `i_${randomId()}`
        return x
      })   
      
      cData.data = cData.data.slice(0, comments).map(x => {
        x._id = `c_${randomId()}`
        x.pid = returnRandom(pData)._id
        x.authorId = returnRandom(uData)._id
        return x
      })  
      
      
      let promises = [];

      iData.data.forEach((x, index) => {        
        if(index < images){
          const {_id} = x  
          promises.push(new Promise( async(resolve) => {
            // @ts-ignore
            await indexdb.add('images', {
              _id, 
              version: 0,
              imageSrc: `https://picsum.photos/50/50?random=${index}`,
              metadata: {}      
            }, true)     
            resolve(null)
          }))   
        }
      })

      uData.data.forEach((x, index) => {        
        if(index < users){
          const {_id, name} = x
          promises.push(new Promise( async(resolve) => {
            // @ts-ignore
            await indexdb.add('users', {
              _id, 
              version: 0,
              firstName: name.split(' ')[0],
              lastName:  name.split(' ')[1] || 'Smith',
              imageId: returnRandom(iData)._id
            }, true)     
            resolve(null)
          }))   
        }
      }) 

      cData.data.forEach((x, index) => {                
        if(index < comments){
          const {_id, pid, authorId, body} = x
          promises.push(new Promise( async(resolve) => {
            // @ts-ignore
            await indexdb.add('comments', {
              _id, 
              version: 0,
              pid, 
              authorId, 
              content: body,
              comments: {
                myCommentId: [], 
                count: 3,
                commentIds: [_id, _id, _id]
              },     
              emotes: {
                myEmote: returnRandomNumber(uData) > uData.data.length/2 ? 'like' : 'dislike',
                like: {
                  count: returnRandomNumber(uData),
                  userIds: []
                },
                dislike: {
                  count: returnRandomNumber(uData),
                  userIds: []
                },
                angry: {
                  count: returnRandomNumber(uData),
                  userIds: []
                },
                sad: {
                  count: returnRandomNumber(uData),
                  userIds: []
                },
                wink: {
                  count: returnRandomNumber(uData),
                  userIds: []
                }                                
              },                       
            }, true)     
            resolve(null)
          }))   
        }
      })       

      pData.data.forEach((x, index) => {               
        if(index < posts){   
          const {_id, title} = x;   

          const authorId = returnRandom(uData)._id
          const comments = cData.data.filter(x => x.pid === _id)

          promises.push(new Promise( async(resolve) => {
            // @ts-ignore
            await indexdb.add('posts', {
              _id, 
              version: 0,
              content: title,
              allowShare: {
                friends: true,
                anybody: false
              },
              allowComments: {
                friends: true,
                anybody: false
              },
              allowEmotes: {
                friends: true,
                anybody: false
              },
              comments: {
                myCommentId: comments.filter(x => x.authorId === authorId).map(x => x._id), 
                count: comments.length,
                commentIds: comments.filter(x => x.authorId !== authorId).map(x => x._id)
              },
              emotes: {
                myEmote: returnRandomNumber(uData) > uData.data.length/2 ? 'like' : 'dislike',
                like: {
                  count: returnRandomNumber(uData),
                  userIds: []
                },
                dislike: {
                  count: returnRandomNumber(uData),
                  userIds: []
                },
                angry: {
                  count: returnRandomNumber(uData),
                  userIds: []
                },
                sad: {
                  count: returnRandomNumber(uData),
                  userIds: []
                },
                wink: {
                  count: returnRandomNumber(uData),
                  userIds: []
                }                                
              },
              authorId,
              updatedOn: randomDate(new Date(2012, 0, 1), new Date())  
            }, true)     
            resolve(null)
          }))   
        }
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
    indexdb.clear('following')
    // @ts-ignore
    indexdb.clear('posts')
    // @ts-ignore
    indexdb.clear('images')
    // @ts-ignore
    indexdb.clear('users')

    window.localStorage.removeItem('me')     
    window.localStorage.removeItem('viewing')             
          
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