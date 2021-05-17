<script lang='ts'>
  import {onMount, setContext} from 'svelte';
  import {IndexDBStore} from '../../js/index'
  import { capitalizeStr, createChannel, createDB } from '../../js/utility'  
  import {createTestData} from '../../js/testutility'

  import Header from '@components/Header/Header.svelte'
  import Footer from '@components/Footer/Footer.svelte'  
  import ColumnLayout from '@components/Layout/ColumnLayout.svelte'
  import Channels from '@components/Channels/Channels.svelte'
  import HashWatch from '@components/URLWatcher/HashWatch.svelte'
  import SnackBar from '@components/Snackbar/Snackbar.svelte'
  import IDB from '@components/Utility/IndexDBSetup.svelte'
  import LocalStorageWatch from '../../components-db/LocalStorageWatch.svelte'

  import LocalStorageWatchAlias from './components/_localstoragewatch.svelte'
  import LoginAlias from './components/_login.svelte'
  import TestUtilityAlias from './components/_testutility.svelte'
  import UserFetcherAlias from './components/_userfetcher.svelte'
  import UserPortraitAlias from './components/_userportrait.svelte'


  //--------------------------- 
  let ready = false;
  //--------------------------- 

   //--------------------------- CHANNEL
  const channel = createChannel({
    sort: true,
    sortBy: 'id',
    data: [
    {content: LocalStorageWatchAlias, id: 'localstoragewatch'}, 
    {content: LoginAlias, id: 'login'}, 
    {content: TestUtilityAlias, id: 'testutility'}, 
    {content: UserFetcherAlias, id: 'userfetcher'}, 
    {content: UserPortraitAlias, id: 'userportrait'}, 
  ]})   

  const links = channel.data.map(({id}) => {
    return {title: capitalizeStr(id), href: `#components-db?component=${id}`}
  }).sort((a, b) => a?.title.localeCompare(b?.title))


  const onChange = ({params}) => {       
    const index = links.findIndex(link => {
      return link?.title.toLowerCase() === params?.component
    }) 
    channel.current = index < 0 ? 0 : index
  }  
  //--------------------------- 
  

  //--------------------------- DB (must be set at root of app)
  // name/version
  const indexdb:any = new IndexDBStore('components-db', 1); 
  let db = null;
  
  // set context so it can be referenced in children components
  setContext('indexdb', indexdb)

  onMount(async() => {

    db = createDB({
      indexdb,
      tables: ['users', 'posts', 'images', 'comments'], 
      data: {

      }, 
      queryBy: '_id'
    })

  })  

  const dbReady = async() => {
    ready = true;
  }  

  const populateDB = async() => {
    let {users, images, comments, posts} = await createTestData()

    const promises = []
    
    users.forEach(user => {
      promises.push(new Promise( async(resolve) => {
        await indexdb.add('users', user, true)
        resolve(null)
      }))
    })

    images.forEach(image => {
      promises.push(new Promise( async(resolve) => {
        await indexdb.add('images', image, true)
        resolve(null)
      }))
    })    

    comments.forEach(comment => {
      promises.push(new Promise( async(resolve) => {
        await indexdb.add('comments', comment, true)
        resolve(null)
      }))
    })

    posts.forEach(post => {
      promises.push(new Promise( async(resolve) => {
        indexdb.add('posts', post, true)
        resolve(null)
      }))
    })    

    Promise.all(promises).then(async() => {  
      location.reload();
    })    
  }

  const clearDB = () => {
    indexdb.clear('users')
    indexdb.clear('posts')
    indexdb.clear('images')
    indexdb.clear('comments')

    localStorage.removeItem('login')

    location.reload()
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

  //---------------------------  LOCALSTORAGE 
  let loginData = null;
  const onFetch = ({success, data}) => {
    loginData = success ? data : null;
  }
  //---------------------------   
  
</script>

<LocalStorageWatch key='login' {onFetch}/>

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


<div class='options'>
  {#if loginData?.username}
    <p>Logged in as: {loginData.username}</p>
  {/if}
  <button on:click={populateDB}>Populate Database</button>
  <button on:click={clearDB}>Clear Database and Logout</button>
</div>

<style lang='scss'>
  .options{
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: #333;
    color: white;  
    padding: 10px;
    border-radius: 10px; 

    p{
      padding-bottom: 10px;
      margin: 0;
    } 
  }

</style>