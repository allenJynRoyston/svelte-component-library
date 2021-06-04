<script lang='ts'>
  //--------------------------- IMPORTS  
  import {setContext} from 'svelte'
  import {IndexDBStore} from '../../js/index'

  import Header from '@layout/Header.svelte'
  import ColumnLayout from '@layout/ColumnLayout.svelte'
  import Channels from '@base/Channels.svelte'
  import HashWatch from '@core/HashWatch.svelte'
  import SnackBar from '@core/Snackbar.svelte'

  import Home from './pages/StrongCookieHome.svelte'
  import About from './pages/StrongCookieAbout.svelte'
  import Products from './pages/StrongCookieProducts.svelte'
  import Checkout from './pages/StrongCookieCheckout.svelte'
  import IDB from '@core/IndexDBSetup.svelte'

  import { createChannel, createDB } from '../../js/utility'  
  //--------------------------- 

  //--------------------------- 
  let ready = false;
  //--------------------------- 

  //--------------------------- CHANNEL
  const hrefroot = '#strong-cookie?component'

  const links = [
    {title: 'Home', href: `${hrefroot}=home` },
    {title: 'About', href: `${hrefroot}=about` },
    {title: 'Products', href: `${hrefroot}=products` },
    {title: 'Checkout', href: `${hrefroot}=checkout` },
  ]

  const channel = createChannel({
    data: [
      {content: Home},
      {content: About},
      {content: Products},
      {content: Checkout},
    ]  
  }) 

  const onChange = ({params}) => {       
    const index = links.findIndex(link => {
      return link?.title.toLowerCase() === params?.component
    }) 
    channel.current = index < 0 ? 0 : index
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

<ColumnLayout {links} >
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


