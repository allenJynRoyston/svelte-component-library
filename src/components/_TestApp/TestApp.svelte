<script>
  //--------------------------- IMPORTS  
  import {onMount, setContext } from 'svelte'
  import {CreateComment} from '../../js/create'
  import {IndexDBStore} from '../../js/index'

  import TestUtility from '../TestUtility/TestUtility'  
  import URLWatcher from '../URLWatcher/URLWatcher'
  import Channels from '../Channels/Channels'
  import LoremBlock from '../_Library/LoremBlock'
  //--------------------------- 

  //--------------------------- APP CONTEXT   
  let myDetails = window.localStorage.getItem('me')  
      myDetails = JSON.parse(myDetails) || null

  setContext('myDetails', myDetails)  
  setContext('loggedIn', myDetails !== null )
  
  setContext('findUserById', (id) => {        
    return indexdb.get('users', id)
  })

  setContext('findUserByUsername', (username) => {    
    return new Promise(async(resolve) => {    
      let users = await indexdb.getAll('users')      
      resolve(users.find(x => x.username === username) || null)      
    })
  })  

  setContext('findPostById', (id) => {
    return indexdb.get('posts', id)
  })
  
  setContext('findImageById', (id) => {
    return indexdb.get('images', id)
  })
  
  setContext('findCommentById', (id) => {
    return indexdb.get('comments', id)
  })
    
  setContext('updateUserById', async(data) => {
    await indexdb.add('users', data, true)
    const comment = await indexdb.get('users', data._id)
    return comment
  })  

  setContext('updatePostById', async(data) => {
    await indexdb.add('posts', data, true)
    const comment = await indexdb.get('posts', data._id)
    return comment
  })  
  
  setContext('updateImageById', async(data) => {
    await indexdb.add('images', data, true)
    const comment = await indexdb.get('images', data._id)
    return comment
  })    

  setContext('updateCommentById', async(data) => {
    await indexdb.add('comments', data, true)
    const comment = await indexdb.get('comments', data._id)
    return comment
  })      

  setContext('createComment', (comment) => {    
    return new Promise(async(resolve) => {            
      resolve(await CreateComment(comment, indexdb))
    })    
  })
  //---------------------------   

  //--------------------------- VARS  
  const indexdb = new IndexDBStore('snappfireDB', 1);             
  setContext('indexdb', indexdb)  
  //---------------------------  

  //--------------------------- ONMOUNT
  onMount(async() => {    
    await setupIndexDB();  // setup required indexDB stuff
  })
  //---------------------------


  //--------------------------- FUNCTIONS
  const setupIndexDB = () => {
    return new Promise(async(resolve) => {
      const indexdbTables = ['users', 'posts', 'comments', 'images']
      await indexdb.createTable(indexdbTables);
      resolve()
    })
  }
  //---------------------------


  const channelProps = {
     data: [
      {content: LoremBlock, render: false},
      {content: LoremBlock, render: false},
      {content: LoremBlock, render: false},
      {content: LoremBlock, render: false},
      {content: LoremBlock, render: false},
      {content: LoremBlock, render: false}
    ],
    current: 0,
    transition: {
      ease: 'cubicOut',
      speed: 400
    },
    channelReady: (index) => {
      channelProps.data = channelProps.data.map((x, i) => {
        if(i === index){
          x.render = true
        }
        return x
      })      
    },
    afterUpdate: () => {
      
    }
  }    

</script>



<div class='test-app'>
  <h1>Test App</h1>
  <!-- <TestUtility /> -->
  <!-- <Channels {...channelProps} /> -->
</div>

<style lang='scss' scoped>
  .test-app{
    width: calc(100% - 50px);
    height: 100vh;
    padding: 10px 25px;
    display: block;
    overflow-y: auto;
  }
</style>
