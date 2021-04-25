<script>
  //--------------------------- IMPORTS  
  import Header from '../../components/Header/Header'
  import Footer from '../../components/Footer/Footer'    
  import Link from '../../components/Link/Link'
  import BasicLayout from '../../components/Layout/BasicLayout'  
  import Channels from '../../components/Channels/Channels'

  import Home from './components/StrongCookieHome'
  import About from './components/StrongCookieAbout'
  import Products from './components/StrongCookieProducts'
  //--------------------------- 

  //--------------------------- APP CONTEXT   
  const channelProps = {
     data: [
      {content: Home, title: 'Home', render: false, active: false},
      {content: About, title: 'About', render: false, active: false},
      {content: Products, title: 'Products', render: false, active: false},
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

<Header>
  <h1>Strongcookie.com</h1>
</Header>
<BasicLayout >
  <div slot='directory'>
    <div class='column'>
      {#each channelProps.data as { title, active }, i}
        <Link active={active} href={`#strong-cookie?component=${title.toLowerCase()}`} onClick={() => {gotoChannel(i)}}>
          {title}
        </Link>
      {/each}
    </div>
  </div>
  <Channels {...channelProps} />
</BasicLayout>

<Footer />


<style lang='scss' scoped>
  .column {
    display: flex; 
    flex-direction: column;
  }
</style>


