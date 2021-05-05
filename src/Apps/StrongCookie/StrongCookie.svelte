<script lang='ts'>
  //--------------------------- IMPORTS  
  import {setContext} from 'svelte'
  import {IndexDBStore} from '../../js/index'

  import Header from '../../components/Header/Header.svelte'
  import Link from '../../components/Link/Link.svelte'
  import ColumnLayout from '../../components/Layout/ColumnLayout.svelte'  
  import Channels from '../../components/Channels/Channels.svelte'
  import HashWatch from '../../components/URLWatcher/HashWatch.svelte'
  import SnackBar from '../../components/Snackbar/Snackbar.svelte'

  import Home from './pages/StrongCookieHome.svelte'
  import About from './pages/StrongCookieAbout.svelte'
  import Products from './pages/StrongCookieProducts.svelte'
  import Checkout from './pages/StrongCookieCheckout.svelte'
  import IDB from '../../components/Utility/IndexDBSetup.svelte'

  import { createChannel, createDB } from '../../js/utility'  
  //--------------------------- 

  //--------------------------- 
  let ready = false;
  //--------------------------- 

  //--------------------------- CHANNEL
  const channel = createChannel({
    data: [
      {content: Home, title: 'Home'},
      {content: About, title: 'About'},
      {content: Products, title: 'Products'},
      {content: Checkout, title: 'Checkout'},
    ]  
  }) 

  const gotoChannel = (index) => {
    channel.current = index
  }  

  const onChange = async({params}) => {                
    const index = channel.data.findIndex(channel => {
      return channel.title.toLowerCase() === params?.component
    })    
    gotoChannel(index < 0 ? 0 : index)    
  }
  //---------------------------

  //--------------------------- DB (must be set at root of app)
  // name/version
  const indexdb = new IndexDBStore('strongcookie', 1); 
  // set context so it can be referenced in children components
  setContext('indexdb', indexdb)
  
  const db = createDB({
    indexdb,
    clearOnRefresh: true,
    tables: ['products'], 
    data: {
      products: [
        {_id: 0, name: 'Strong Cookie', urlName: 'strong-cookie', imgSrc: 'https://picsum.photos/id/2/400/400', price: 1, description: 'Strength level:  high'},
        {_id: 1, name: 'Stronger Cookie', urlName: 'stronger-cookie',  imgSrc: 'https://picsum.photos/id/541/400/400', price: 2, description: 'Strength level:  dude'},
        {_id: 2, name: 'Strongest Cookie', urlName: 'strongest-cookie',  imgSrc: 'https://picsum.photos/id/622/400/400', price: 3, description: 'Strength level:  whoa'},
        {_id: 3, name: 'Smart Cookie', urlName: 'smart-cookie',  imgSrc: 'https://picsum.photos/id/622/400/400', price: 4, description: 'Smart level:  !!'},
        {_id: 4, name: 'Smarter Cookie', urlName: 'smarter-cookie',  imgSrc: 'https://picsum.photos/id/622/400/400', price: 4, description: 'Smart level:  !!!'},
      ]
    }, 
    queryBy: 'urlName'
  })

  const dbReady = async() => {
    ready = true;
  }
  //---------------------------

  //---------------------------  SNACKBAR CODE
  let snack;
  setContext('addSnack', (newSnack) => {
    snack = newSnack
  })
  //--------------------------- 

</script>

<IDB {...db} onReady={dbReady} />
<HashWatch {onChange} />
<SnackBar {snack} />

<Header>
  <h1>Strongcookie.com</h1>
</Header>

<ColumnLayout >
  <div class='directory' slot='directory'>
    {#each channel.data as { title }, i}
      <Link active={channel.current === i} href={`#strong-cookie?component=${title.toLowerCase()}`} onClick={() => {gotoChannel(i)}}>
        {title} 
      </Link>
    {/each}
  </div>
  {#if ready}
    <Channels {...channel} backtotop />
  {/if}
</ColumnLayout>



<style lang='scss' scoped>
  .directory {
    display: flex; 
    flex-direction: column;
  }
</style>


