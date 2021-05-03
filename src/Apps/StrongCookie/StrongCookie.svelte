<script lang='ts'>
  //--------------------------- IMPORTS  
  import {setContext} from 'svelte'
  import {IndexDBStore} from '../../js/index'

  import Header from '../../components/Header/Header.svelte'
  import Footer from '../../components/Footer/Footer.svelte'    
  import Link from '../../components/Link/Link.svelte'
  import ColumnLayout from '../../components/Layout/ColumnLayout.svelte'  
  import Channels from '../../components/Channels/Channels.svelte'
  import HashWatch from '../../components/URLWatcher/HashWatch.svelte'
  
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
        {_id: 0, name: 'Strong Cookie', price: 1, description: 'Strength level:  high'},
        {_id: 1, name: 'Stronger Cookie', price: 2, description: 'Strength level:  dude'},
        {_id: 2, name: 'Strongest Cookie', price: 3, description: 'Strength level:  whoa'},
      ]
    }, 
    queryBy: '_id'
  })

  const dbReady = async() => {
    ready = true;
  }
  //---------------------------

</script>

<IDB {...db} onReady={dbReady} />
<HashWatch {onChange} />
<!-- 
<Header>
  <h1>Strongcookie.com</h1>
</Header>

<Footer /> -->
<ColumnLayout >
  <div class='directory' slot='directory'>
    {#each channel.data as { title }, i}
      <Link active={channel.current === i} href={`#strong-cookie?component=${title.toLowerCase()}`} onClick={() => {gotoChannel(i)}}>
        {title} 
      </Link>
    {/each}
  </div>
  {#if ready}
    <Channels {...channel} />
  {/if}
</ColumnLayout>




<style lang='scss' scoped>
  .directory {
    display: flex; 
    flex-direction: column;
  }
</style>


