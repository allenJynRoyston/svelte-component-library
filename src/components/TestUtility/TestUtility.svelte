<script>
  //---------------------------
  import {tick, onMount, getContext} from 'svelte'
  import {Button, Form, UserFetcher} from '../index'  
  import axios from 'axios';

  //---------------------------
  export let viewerId = null

  //---------------------------
  const indexdb = getContext('indexdb')
  const loggedIn = getContext('loggedIn')
  const myDetails = getContext('myDetails')

  let isReady = false;
  let loginAsProps = {}
  let mimicAsProps = {}
  let viewer = null
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
            x.title = `${x.firstName} ${x.lastName}`
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
            x.title = `${x.firstName} ${x.lastName}`
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

    await tick()
    isReady = true
  })

  //---------------------------
  const setupMockUsers = () => {
    return new Promise(async(resolve) => {
      resolve(await indexdb.getAll('users'))    
    })
  }

  const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  const returnRandom = (dataset) => {
    const random = Math.floor(Math.random() * dataset.data.length);
    return dataset.data[random]
  }

  const randomId = () => {
    return Math.random().toString(36).substring(7);
  }
  
  const addTestData = async(users = 10, posts = 500, images = 50) => {
    let pData = await axios.get('https://jsonplaceholder.typicode.com/posts')
    let uData = await axios.get('https://jsonplaceholder.typicode.com/users')
    let iData = await axios.get('https://jsonplaceholder.typicode.com/photos')

    // fill fields to make it a compatable dataset
    pData.data = pData.data.slice(0, posts).map(x => {
      x._id = `p_${randomId()}`
      return x
    })

    uData.data = uData.data.slice(0, users).map(x => {
      x._id = `u_${randomId()}`
      return x
    })    

    iData.data = iData.data.slice(0, images).map((x, i) => {
      x._id = `i_${randomId()}`
      return x
    })     
    

    iData.data.forEach((x, index) => {
      const {_id} = x  
      if(index < images){
        indexdb.add('images', {
          _id, 
          version: 0,
          imageSrc: `https://picsum.photos/50/50?random=${index}`,
          metadata: {}      
        }, true)     
      }
    })

    uData.data.forEach((x, index) => {
      const {_id, name} = x
      if(index < users){
        indexdb.add('users', {
          _id, 
          version: 0,
          firstName: name.split(' ')[0],
          lastName:  name.split(' ')[1] || 'Smith',
          imageId: returnRandom(iData)._id
        }, true)  
      }
    })    

    pData.data.forEach((x, index) => {
      const {_id, title} = x;   
      if(index < posts){   
        indexdb.add('posts', {
          _id, 
          version: 0,
          content: title,
          authorId: returnRandom(uData)._id,
          updatedOn: randomDate(new Date(2012, 0, 1), new Date())  
        }, true)
      }
    })


    setTimeout(() => {
      alert("test data added.")
      location.reload()
    }, 4000)
  }  

  const logOut = () => {
    window.localStorage.removeItem('me')             
    window.localStorage.removeItem('viewing')             
    location.reload()
  }

  const clearTestData = () => {
    indexdb.clear('following')
    indexdb.clear('posts')
    indexdb.clear('images')
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

</script>


{#if viewerId} 
  <UserFetcher id={viewerId} onComplete={appendUserData} />
{/if}

{#if isReady}
  <div class='testutility-container'>
    <div class='testutility-container__item'>
      <Button onClick={addTestData}> Add test data </Button>
      <Button onClick={clearTestData}> Clear test data </Button>  
      <Button onClick={logOut}> Logout </Button>  
    </div>
    <hr>

    <div class='testutility-container__item'>
      <Form {...loginAsProps} showButton={false} style={'margin-right: 5px'}/>    
      <Form {...mimicAsProps} showButton={false} style={'margin-left: 5px'}/>    
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

    &__item{
      display: flex; justify-content: space-between      
    }

  }
</style>