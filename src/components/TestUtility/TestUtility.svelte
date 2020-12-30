<script>
  //---------------------------
  import {tick, onMount, setContext, getContext} from 'svelte'
  import {Button, Form} from '../index'  
  import axios from 'axios';

  //---------------------------

  //---------------------------
  const indexdb = getContext('indexdb')
  const loggedIn = getContext('loggedIn')
  const myDetails = getContext('myDetails')

  let isReady = false;
  let formData = []
  let formProps = {}
  //---------------------------

  //---------------------------
  onMount(async() => {
    await setupMockUsers()

    const options = await setupMockUsers() || []    

    formData = [
      {
        renderAs: 'select', 
        label: 'Login as',     
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
    
    formProps = {
      formData
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
    return Math.random().toString(36).substring(12);
  }
  
  const addTestData = async() => {
    let pData = await axios.get('https://jsonplaceholder.typicode.com/posts')
    let uData = await axios.get('https://jsonplaceholder.typicode.com/users')
    let iData = await axios.get('https://jsonplaceholder.typicode.com/photos')

    // fill fields to make it a compatable dataset
    pData.data = pData.data.map(x => {
      x._id = `p_${randomId()}`
      return x
    })

    uData.data = uData.data.map(x => {
      x._id = `u_${randomId()}`
      return x
    })    

    iData.data = iData.data.map((x, i) => {
      x._id = `i_${randomId()}`
      return x
    })     
    

    iData.data.forEach(x => {
      const {_id, thumbnailUrl} = x  
      indexdb.add('images', {
        _id, 
        version: 0,
        imageSrc: thumbnailUrl,
        metadata: {}      
      }, true)     
    })

    uData.data.forEach(x => {
      const {_id, name} = x
      indexdb.add('users', {
        _id, 
        version: 0,
        firstName: name.split(' ')[0],
        lastName:  name.split(' ')[1] || 'Smith',
        imageId: returnRandom(iData)._id
      }, true)  
    })    

    pData.data.forEach(x => {
      const {_id, title} = x;      
      indexdb.add('posts', {
        _id, 
        version: 0,
        authorId: returnRandom(uData)._id,
        content: title,
        updatedOn: randomDate(new Date(2012, 0, 1), new Date())  
      }, true)
    })

    setTimeout(() => {
      alert("test data added.")
      location.reload()
    }, 2000)
  }  


  const clearTestData = () => {
    indexdb.clear('following')
    indexdb.clear('posts')
    indexdb.clear('images')
    indexdb.clear('users')

    alert("clear test data.")
    location.reload()
  }
  //---------------------------


</script>

{#if isReady}
  <div>
    <Button onClick={addTestData}> Add test data </Button>
    <Button onClick={clearTestData}> Clear test data </Button>  
    <hr>
    <Form {...formProps} showButton={false} />    
    <p>Logged in as: <strong>{getContext('loggedIn') ? `${getContext('myDetails').firstName} ${getContext('myDetails').lastName}` : 'not logged in'}</strong></p>

  </div>
{/if}
