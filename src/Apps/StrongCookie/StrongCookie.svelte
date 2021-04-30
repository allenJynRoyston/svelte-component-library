<script>
  //--------------------------- IMPORTS  
  import Header from '../../components/Header/Header'
  import Footer from '../../components/Footer/Footer'    
  import Link from '../../components/Link/Link'
  import ColumnLayout from '../../components/Layout/ColumnLayout'  
  import Channels from '../../components/Channels/Channels'
  import HashWatch from '../../components/URLWatcher/HashWatch'
  
  import Home from './pages/StrongCookieHome'
  import About from './pages/StrongCookieAbout'
  import Products from './pages/StrongCookieProducts'
  import Checkout from './pages/StrongCookieCheckout'
  //--------------------------- 

  //--------------------------- APP CONTEXT   
  let ready = false;

  const channelProps = {
     data: [
      {content: Home, title: 'Home', render: false, active: false},
      {content: About, title: 'About', render: false, active: false},
      {content: Products, title: 'Products', render: false, active: false},
      {content: Checkout, title: 'Checkout', render: false, active: false},
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

  const onChange = ({params}) => {    
    ready = true;
    if(params?.component){
      const index = channelProps.data.findIndex(channel => {
        return channel.title.toLowerCase() === params.component
      })
      gotoChannel(index)
    }  
  }

</script>


<HashWatch onChange={onChange}/>

{#if ready}
  <Header>
    <h1>Strongcookie.com</h1>
  </Header>
  <ColumnLayout >
    <div class='directory' slot='directory'>
      {#each channelProps.data as { title, active }, i}
        <Link active={active} href={`#strong-cookie?component=${title.toLowerCase()}`} onClick={() => {gotoChannel(i)}}>
          {title}
        </Link>
      {/each}
    </div>
    <Channels {...channelProps} />
  </ColumnLayout>
  <Footer />
{/if}

<style lang='scss' scoped>
  .directory {
    display: flex; 
    flex-direction: column;
  }
</style>


