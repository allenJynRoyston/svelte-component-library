<script lang='ts'>
  import {onMount} from 'svelte';
  import InnerContainer from '../../../components/InnerContainer/InnerContainer.svelte'
  import Footer from '../../../components/Footer/Footer.svelte'
  import Header from '../../../components/Header/Header.svelte'
  import Splash from '../../../components/Splash/Splash.svelte'
  import NavBar from '../../../components/NavBar/NavBar.svelte'

  //--------------------------- 
  let headerprops = {
    logoSrc: './images/mock-logo-250x250.png',    
    navEle: {
      component: NavBar,
      props: {
        links: [
          {title: 'Home', icon: 'icon', href: '#components?page=home'},
          {title: 'Library', icon: 'icon', href: '#components?page=library'},
          {title: 'Github', icon: 'icon', href: '#components?page=github'}
        ]    
      }
    },
    centerEle: {
      component: Splash,
      props: {
        title: 'Welcome!',
        buttonOne: {
          text: 'Download',
          type: 'hollow',
          href: '#components?component=header&link=cta1',
          size: 'large',
          rounded: true,     
        },
        buttonTwo: {
          text: 'Library',
          type: 'primary',
          href: '#components?component=header&link=cta2',
          size: 'large',
          rounded: true,          
        }        
      }
    }
  }  
  //--------------------------- 

</script>

<div class='home-page'>
  <InnerContainer>

   
    <div class='home-section'>
      <h1>
        Home
      </h1>
    </div>

    <Footer />
  
  </InnerContainer>
</div>



<style lang='scss'>
  .home-page{
    display: flex;
    flex-direction: column;
  }

  .home-section{
    min-height: 100vh;
  }

  .inner{    
    overflow-y: auto
  }
</style>
  