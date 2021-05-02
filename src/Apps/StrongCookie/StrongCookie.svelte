<script lang='ts'>
  //--------------------------- IMPORTS  
  import {tick} from 'svelte'
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

  //--------------------------- DB
  const db = createDB({
    version: 1,
    name: 'strongcookie', 
    clearOnRefresh: true,
    tables: ['products'], 
    data: {
      products: [
        {name: 'Product 1', price: 1, description: 'foo'},
        {name: 'Product 2', price: 2, description: 'bar'},
        {name: 'Product 3', price: 3, description: 'foobar'},
        {name: 'Product 4', price: 4, description: 'extrabar'},
      ]
    }, 
  })
  //---------------------------

</script>

<IDB {...db} />
<HashWatch {onChange} />

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
  <Channels {...channel} />
</ColumnLayout>

<Footer />


<style lang='scss' scoped>
  .directory {
    display: flex; 
    flex-direction: column;
  }
</style>


