<script>
  //--------------------------- IMPORTS  
  import {onMount, setContext } from 'svelte'
  import {CreateComment} from '../../js/create'
  import {IndexDBStore} from '../../js/index'

  import Link from '../../components/Link/Link'
  import ColumnLayout from '../../components/Layout/ColumnLayout'
  import TestUtility from '../../components/TestUtility/TestUtility'  
  import Channels from '../../components/Channels/Channels'
  import LoremBlock from '../../components/LoremBlock/LoremBlock'
  //--------------------------- 

  //--------------------------- APP CONTEXT   
  let ready = false;
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
    ready = true
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
      {content: TestUtility, title: 'TestUtility', render: false, active: false},
      {content: LoremBlock, title: 'Section 1', render: false, active: false},
    ],
    current: 0,
    transition: {
      ease: 'cubicOut',
      speed: 400
    },
    channelReady: (index) => {
      channelProps.data = channelProps.data.map((x, i) => {
        x.active = false;
        if(i === index){
          x.active = true;
          x.render = true;
        }
        return x
      })      
    },
    afterUpdate: () => {
      
    }
  }    

  const gotoChannel = (index) => {
    channelProps.current = index
  }  

</script>

<ColumnLayout >
  <div slot='directory'>
    <div class='column'>
      {#each channelProps.data as { title, active }, i}
        <Link active={active} href={`#app?component=${title.toLowerCase()}`} onClick={() => {gotoChannel(i)}}>
          {title}
        </Link>
      {/each}
    </div>
  </div>
  {#if ready}
    <Channels {...channelProps} />
  {/if}
</ColumnLayout>




<style lang='scss' scoped>
  .column {
    display: flex; 
    flex-direction: column;
  }
</style>


