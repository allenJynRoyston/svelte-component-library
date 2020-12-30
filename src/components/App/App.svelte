<script>
  //--------------------------- IMPORTS  
  import {onMount, setContext, getContext } from 'svelte'
  import {Feed, Button, TestUtility, FormExample} from '../index'
  import {IndexDBStore} from '../../js/index'
  //--------------------------- 

  //--------------------------- APP CONTEXT   
  let myDetails = window.localStorage.getItem('me')  
      myDetails = JSON.parse(myDetails) || null

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
  let isReady = false
  let loggedIn = getContext('loggedIn')
  let feedData = []

  setContext('indexdb', indexdb)  
  //---------------------------  

  //--------------------------- ONMOUNT
  onMount(async() => {
    // setup required indexDB stuff
    await setupIndexDB();

    feedData = loggedIn ? await indexdb.getAll('posts') : []
    feedData = feedData.filter(x => x.authorId ===  myDetails._id).map(x => {
      x.postId = x._id
      return x
    })
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

<!-- 
<Card>
  <FormExample idModifier={'a'} localStorageKey={'form_A'} clearLocalStorage={true} />
</Card>


<Card>
  <FormLogin idModifier={'b'} localStorageKey={'form_B'} clearLocalStorage={true} />
</Card> -->

<div id='app-wrapper'>
  {#if isReady}
    <!-- <FormExample />     -->
    <TestUtility />    

    <br><br>
    <Feed 
      owner={loggedIn ? myDetails._id : null} 
      viewAs={loggedIn ? myDetails._id : null} 
      data={feedData} 
      />


    <br><br>


    <!-- <Card>
      <span slot='header'>Header</span>
      <FormLogin localStorageKey={'form_C'} clearLocalStorage={true} />
      <span slot='footer'>Footer</span>
    </Card> -->
  {:else}
    <p>Loading...</p>
  {/if}
</div>


