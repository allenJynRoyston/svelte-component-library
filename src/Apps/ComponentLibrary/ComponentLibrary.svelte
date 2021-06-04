<script lang='ts'>
  import {getContext} from 'svelte';
  import { createChannel } from '@js/utility'

  import SearchThemeNotch from './pagecomponents/SearchThemeNotch.svelte'

  import Channels from '@base/Channels.svelte'
  import HashWatch from '@core/HashWatch.svelte'
  import Splash from '@layout/Splash.svelte'
  import NavBar from '@layout/NavBar.svelte'
  
  import Home from './pages/home.svelte';
  import Library from './pages/library.svelte';
  import Documentation from './pages/documentation.svelte';

  const theme:string = getContext('theme')
  let version = '0.7.2';

  //--------------------------- 
  let headerprops = {
    title: 'SvelteTip',    
    bgSrc: `./images/bg/header-${theme}-bg.jpg`,
    logoSrc: './images/logo/logo.png',     
    showNotch: true,           
    navEle: {
      component: NavBar,
      props: {
        watchProp: 'page',
        links: [
          {title: 'Home', icon: 'home', href: '#components?page=home'},
          {title: 'Library', icon: 'list', href: '#components?page=library'},
          {title: 'Documentation', icon: 'file-text', href: '#components?page=documentation'}
        ]    
      }
    },
    heroEle: {
      component: Splash,
      props: {
        title: 'Welcome!',
        version,
        buttonOne: {
          text: 'Github',
          applyTheme: theme === 'dark' ? 'white' : 'black',
          href: 'https://github.com/allenRoyston/svelte-component-library',
          rounded: true,     
          hollow: true
        },
        buttonTwo: {
          text: 'Library',
          applyTheme: 'primary',
          href: '#components?page=library',
          rounded: true,          
        }        
      }
    },
    notchEle: {      
      component: SearchThemeNotch,       
    }
  }  
  //---------------------------   

  //--------------------------- CHANNEL
  const channel = createChannel({    
    data: [    
      {content: Home, id: 'home', props: {headerprops}},
      {content: Library, id: 'library', props: {headerprops}},  
      {content: Documentation, id: 'documentation', props: {headerprops}}
  ]})   

  const onChange = ({params}) => {       
    const index = channel.data.findIndex(data => {
      return data?.id.toLowerCase() === params?.page
    }) 
    channel.current = index < 0 ? 0 : index
  }  
  //--------------------------- 

</script>

<HashWatch onChange={onChange}/>
<Channels {...channel} selfContained />

<style lang='scss'>
  @import "../../scss/src/_media-queries.scss";

  :global(.section-wrap){
    padding: 20px 0;
    max-width: 600px;
    margin: auto;
    text-align: justify;

    @include desktop-and-up {
      padding: 50px 0;
    }

  }

</style>