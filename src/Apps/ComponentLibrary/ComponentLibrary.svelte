<script lang='ts'>
  import {getContext} from 'svelte';
  import { createChannel } from '../../js/utility'

  import Channels from '@components/Channels/Channels.svelte'
  import HashWatch from '@components/URLWatcher/HashWatch.svelte'
  import Splash from '@components/Splash/Splash.svelte'
  import NavBar from '@components/NavBar/NavBar.svelte'
  
  import Home from './pages/home.svelte';
  import Library from './pages/library.svelte';

  const theme:string = getContext('theme')

  //--------------------------- 
  let headerprops = {
    logoSrc: './images/logo/logo.png',    
    navEle: {
      component: NavBar,
      props: {
        watchProp: 'page',
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
          type: theme === 'dark' ? 'white' : 'black',
          href: '#components?component=header&link=cta1',
          rounded: true,     
          hollow: true
        },
        buttonTwo: {
          text: 'Library',
          type: 'primary',
          href: '#components?page=library',
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
<Channels {...channel} exactfit />

