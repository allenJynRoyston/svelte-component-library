<script lang='ts'>
  import {setContext} from 'svelte';
  import Header from '../../components/Header/Header.svelte'
  import Channels from '../../components/Channels/Channels.svelte'
  import HashWatch from '../../components/URLWatcher/HashWatch.svelte'
  import SnackBar from '../../components/Snackbar/Snackbar.svelte'
  import ThemeWrapper from '../../components/ThemeWrapper/ThemeWrapper.svelte'
  import Splash from '../../components/Splash/Splash.svelte'
  import NavBar from '../../components/NavBar/NavBar.svelte'
  import { createChannel } from '../../js/utility'


  import Home from './pages/home.svelte';
  import Library from './pages/library.svelte';

  //---------------------------
  let theme = 'light'
  setContext('theme', theme)
  //---------------------------

  //--------------------------- CHANNEL
  const channel = createChannel({    
    data: [    
      {content: Home, id: 'home'},
      {content: Library, id: 'library'},  
  ]})   

  const onChange = ({params}) => {       
    const index = channel.data.findIndex(data => {
      return data?.id.toLowerCase() === params?.page
    }) 
    channel.current = index < 0 ? 0 : index
  }  
  //--------------------------- 

  //---------------------------  SNACKBAR CODE
  let snack;
  setContext('addSnack', (newSnack) => {
    snack = newSnack
  })
  //--------------------------- 

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

<HashWatch onChange={onChange}/>
<SnackBar {snack} />


<ThemeWrapper {theme}>
  
    <Header {...headerprops} expand={channel.current === 0} bgSrc={`https://picsum.photos/id/${theme === 'dark' ? '1082' : '1001'}/1440/600`}>
      <h1>Svelte Component Library</h1>
    </Header>

    <Channels {...channel} nopadding />


</ThemeWrapper>
