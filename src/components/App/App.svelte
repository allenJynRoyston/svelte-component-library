<script>
  //--------------------------- IMPORTS  
  import {onMount, setContext, getContext } from 'svelte'
  import {Feed, Button, TestUtility, FormExample} from '../index'
  import {IndexDBStore} from '../../js/index'
  //--------------------------- 

  //--------------------------- APP CONTEXT   
  let myDetails = window.localStorage.getItem('me')  
      myDetails = JSON.parse(myDetails) || null

  let viewing = window.localStorage.getItem('viewing')  
      viewing = JSON.parse(viewing) || null      

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

  setContext('updateUserById', (data) => {        
    return indexdb.add('users', data, true)
  })

  setContext('updatePostById', (data) => {    
    return indexdb.add('posts', data, true)
  })
  
  setContext('updateImageById', (data) => {
    return indexdb.add('images', data, true)
  })    
  //---------------------------   

  //--------------------------- VARS  
  const indexdb = new IndexDBStore('snappfireDB', 1);            
  const loggedIn = getContext('loggedIn')  
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
      const indexdbTables = ['users', 'posts', 'images', 'following']
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
    <!-- <FormExample />     -->
    <TestUtility viewerId={viewing && viewing._id} />    
    <Feed feedOwnerId={viewing && viewing._id} friendStatus={'friend'} />  
  {:else}
    <p>Loading...</p>
  {/if}
</div>


