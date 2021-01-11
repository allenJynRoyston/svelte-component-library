<script>
  //--------------------------- IMPORTS  
  import {onMount, setContext, getContext } from 'svelte'
  import {FeedContainer, TestUtility, FormExample} from '../index'
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
  //---------------------------
</script>

<style lang='scss' scoped>
  #app-wrapper{
    max-width: calc(800px - 40px);
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }
</style>



<div id='app-wrapper'>
  {#if isReady}    
    <TestUtility viewerId={viewing && viewing._id}  {friendStatus}/>    
    <FeedContainer feedOwnerId={viewing && viewing._id} {friendStatus} />  
    <!-- <FormExample />     -->

  {:else}
    <p>Loading...</p>
  {/if}
</div>


