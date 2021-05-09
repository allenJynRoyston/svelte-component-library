<script lang='ts'>
  import {onMount, setContext} from 'svelte';
  import {IndexDBStore} from '../../js/index'
  import { createChannel, createDB } from '../../js/utility'  
  import {createTestData} from '../../js/testutility'

  import Header from '../../components/Header/Header.svelte'
  import Footer from '../../components/Footer/Footer.svelte'  
  import ColumnLayout from '../../components/Layout/ColumnLayout.svelte'
  import Channels from '../../components/Channels/Channels.svelte'
  import HashWatch from '../../components/URLWatcher/HashWatch.svelte'
  import SnackBar from '../../components/Snackbar/Snackbar.svelte'
  import IDB from '../../components/Utility/IndexDBSetup.svelte'

  import LocalStorageWatchAlias from './components/_localstoragewatch.svelte'
  import LoginAlias from './components/_login.svelte'
  import TestUtility from './components/_testutility.svelte'


  //--------------------------- 
  let ready = false;
  //--------------------------- 

   //--------------------------- CHANNEL
  const channel = createChannel({data: [
    {content: LocalStorageWatchAlias}, 
    {content: LoginAlias}, 
    {content: TestUtility}, 
  ]})   

  const hrefroot = '#component-db?component'

  const links = [
    {title: 'LocalStorageWatch', href: `${hrefroot}=localstoragewatch` },    
    {title: 'Login', href: `${hrefroot}=login` },   
    {title: 'TestUtility', href: `${hrefroot}=testutility` },    
  ]

  const onChange = ({params}) => {       
    const index = links.findIndex(link => {
      return link?.title.toLowerCase() === params?.component
    }) 
    channel.current = index < 0 ? 0 : index
  }  
  //--------------------------- 
  

  //--------------------------- DB (must be set at root of app)
  // name/version
  const indexdb = new IndexDBStore('components-db', 1); 
  let db = null;
  
  // set context so it can be referenced in children components
  setContext('indexdb', indexdb)

  onMount(async() => {
    let {users, images, comments, posts} = await createTestData()

    db = createDB({
      indexdb,
      clearOnRefresh: true,
      tables: ['users', 'posts', 'images', 'comments'], 
      data: {
        users,
        posts,
        images,
        comments
      }, 
      queryBy: '_id'
    })

  })  

  const dbReady = async() => {
    ready = true;
  }  
  //---------------------------  


  //--------------------------- APP CONTEXT   
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
    const user = await indexdb.get('users', data._id)
    return user
  })  

  setContext('updatePostById', async(data) => {
    await indexdb.add('posts', data, true)
    const post = await indexdb.get('posts', data._id)
    return post
  })  
  
  setContext('updateImageById', async(data) => {
    await indexdb.add('images', data, true)
    const images = await indexdb.get('images', data._id)
    return images
  })    

  setContext('updateCommentById', async(data) => {
    await indexdb.add('comments', data, true)
    const comment = await indexdb.get('comments', data._id)
    return comment
  })      

  // setContext('createComment', (comment) => {    
  //   return new Promise(async(resolve) => {            
  //     resolve(await CreateComment(comment, indexdb))
  //   })    
  // })
  //---------------------------   


  //---------------------------  SNACKBAR CODE
  let snack;
  setContext('addSnack', (newSnack) => {
    snack = newSnack
  })
  //--------------------------- 
  
</script>

{#if !!db}
  <IDB {...db} onReady={dbReady} />
{/if}

<HashWatch onChange={onChange}/>
<SnackBar {snack} />

<Header>
  <h1>Svelte Component-DB Library</h1>
</Header>

<ColumnLayout {links} currentIndex={channel.current} >
  {#if ready}
    <Channels {...channel} />
  {/if}
</ColumnLayout>


<Footer />


