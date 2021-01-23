<script>
  //--------------------------- IMPORTS  
  import {onMount, setContext } from 'svelte'
  import {Header, Footer, Channels, TestUtility} from '../index'
  import {CreateComment} from '../../js/create'
  import {IndexDBStore} from '../../js/index'
  //--------------------------- 

  //--------------------------- APP CONTEXT   
  let myDetails = window.localStorage.getItem('me')  
      myDetails = JSON.parse(myDetails) || null

  let viewing = window.localStorage.getItem('viewing')  
      viewing = JSON.parse(viewing) || null      

  let friendStatus = window.localStorage.getItem('friendstatus')  
      friendStatus = JSON.parse(friendStatus) || null
      friendStatus = !!friendStatus ? friendStatus.title : friendStatus 

  setContext('myDetails', myDetails)  
  setContext('loggedIn', myDetails !== null )
  
  setContext('findUserById', (id) => {        
    return indexdb.get('users', id)
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
  let isReady = false  

  setContext('indexdb', indexdb)  
  //---------------------------  

  //--------------------------- ONMOUNT
  onMount(async() => {
    // setup required indexDB stuff
    await setupIndexDB();
    isReady = true;
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


  //-------------------------- TEST DATA
  let channelData = {
     data: [
      {id: 0, type: 'feed', props: {feedOwnerId: viewing && viewing._id, friendStatus}},
      {id: 1, type: 'test'},
      {id: 2, type: 'form'},
      {id: 3, type: ''},
      // {id: 4, type: ''},
      // {id: 5, type: ''},
      // {id: 6, type: ''},
      // {id: 7, type: ''}
    ],
    current: 0,
    transition: {
      ease: 'cubicOut',
      speed: 600
    },
    onNext: () => {
      // console.log(val)
    },
    onPrev: () => {
      // console.log(val)
    },
  }
  //---------------------------
</script>


<div id='app-wrapper'>
  <Header />
  {#if isReady}    
    
    <TestUtility />
    <div style='display: flex'>
      <button on:click={() => {channelData.current = 0}}>Home</button>
      <button on:click={() => {channelData.current++}}>+ Channel</button>
      <button on:click={() => {channelData.current--}}>- Channel</button>
    </div>
    <Channels {...channelData} />
  {:else}
    <p>Loading...</p>
  {/if}
  <Footer />
</div>

<style lang='scss'>
  #app-wrapper{
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }
</style>

