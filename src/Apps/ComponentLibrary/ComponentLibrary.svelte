<script lang='ts'>
  import {getContext, setContext} from 'svelte';
  import Channels from '../../components/Channels/Channels.svelte'
  import HashWatch from '../../components/URLWatcher/HashWatch.svelte'
  import Splash from '../../components/Splash/Splash.svelte'
  import NavBar from '../../components/NavBar/NavBar.svelte'
  import { createChannel } from '../../js/utility'
  import Home from './pages/home.svelte';
  import Library from './pages/library.svelte';

  const theme:string = getContext('theme')

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

  //--------------------------- CHANNEL
  const channel = createChannel({    
    data: [    
      {content: Home, id: 'home', props: {headerprops}},
      {content: Library, id: 'library', props: {headerprops}},  
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
<Channels {...channel} nopadding />

