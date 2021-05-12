<script lang='ts'>
  import {setContext} from 'svelte';
  import Header from '../../components/Header/Header.svelte'
  import Footer from '../../components/Footer/Footer.svelte'  
  import ColumnLayout from '../../components/Layout/ColumnLayout.svelte'
  import Channels from '../../components/Channels/Channels.svelte'
  import HashWatch from '../../components/URLWatcher/HashWatch.svelte'
  import SnackBar from '../../components/Snackbar/Snackbar.svelte'
  import ThemeWrapper from '../../components/ThemeWrapper/ThemeWrapper.svelte'
  import Splash from '../../components/Splash/Splash.svelte'
  import ThemeSwitcher from '../../components/ThemeSwitch/ThemeSwitch.svelte'
  import { createChannel, capitalizeStr } from '../../js/utility'

  import ButtonAlias from './components/_button.svelte'
  import HeaderAlias from './components/_header.svelte'
  import FooterAlias from './components/_footer.svelte'
  import LoaderAlias from './components/_loader.svelte'
  import ProductCard from './components/_productcard.svelte'
  import LinkAlias from './components/_link.svelte'
  import FormAlias from './components/_formExample.svelte'
  import SearchAlias from './components/_search.svelte'
  import HashWatchAlias from './components/_hashwatch.svelte'
  import SVGAlias from './components/_svg.svelte'
  import ThreeSlotAlias from './components/_threeslot.svelte'
  import TwoSlotAlias from './components/_twoslot.svelte'
  import ChannelAlias from './components/_channels.svelte'
  import ChannelButtonAlias from './components/_channelbutton.svelte'
  import GridLayoutAlias from './components/_gridLayout.svelte'
  import ColumnLayoutAlias from './components/_columnLayout.svelte'
  import ShoppingCartAlias from './components/_shoppingCart.svelte'
  import IndexDBAlias from './components/_idb.svelte'
  import SnackbarAlias from './components/_snackbar.svelte'
  import AccordionAlias from './components/_accordion.svelte'
  import CodeBlockAlias from './components/_codeblock.svelte'
  import SplashAlias from './components/_splash.svelte'
  import NavBarAlias from './components/_navBar.svelte'
  import ThemeWrapperAlias from './components/_themewrapper.svelte'

  //---------------------------
  let theme = 'light'
  let refresh = true;
  const toggleTheme= (_theme) => {
    theme = _theme    
    refresh = false;
    setTimeout(() => {
      refresh = true;
    }, 1)
  }
  //---------------------------

  //--------------------------- CHANNEL
  const channel = createChannel({
    sort: true,
    sortBy: 'id',
    data: [    
    {content: HeaderAlias, id: 'header'},
    {content: FooterAlias, id: 'footer'},
    {content: ButtonAlias, id: 'button'},
    {content: LoaderAlias, id: 'loader'},
    {content: AccordionAlias, id: 'accordion'},    
    {content: ProductCard, id: 'productcard'},
    {content: LinkAlias, id: 'link'},
    {content: FormAlias, id: 'form'},
    {content: SearchAlias, id: 'search'},
    {content: HashWatchAlias, id: 'hashwatch'},
    {content: SVGAlias, id: 'svg'},
    {content: ThreeSlotAlias, id: 'threeslot'},
    {content: TwoSlotAlias, id: 'twoslot'},
    {content: ChannelAlias, id: 'channels'},
    {content: ChannelButtonAlias, id: 'channelbutton'},
    {content: GridLayoutAlias, id: 'gridlayout'},
    {content: ColumnLayoutAlias, id: 'columnlayout'},
    {content: ShoppingCartAlias, id: 'shoppingcart'},
    {content: SnackbarAlias, id: 'snackbar'},
    {content: IndexDBAlias, id: 'indexdb'},
    {content: CodeBlockAlias, id: 'codeblock'},  
    {content: SplashAlias, id: 'splash'},    
    {content: NavBarAlias, id: 'navbar'},    
    {content: ThemeWrapperAlias, id: 'themewrapper'},    
  ]})   


  const links = channel.data.map(({id}) => {
    return {title: capitalizeStr(id), href: `#components?component=${id}`}
  }).sort((a, b) => a?.title.localeCompare(b?.title))


  const onChange = ({params}) => {       
    const index = channel.data.findIndex(data => {
      return data?.id.toLowerCase() === params?.component
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
      component: ThemeSwitcher,
      props: {
        onClick: toggleTheme
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


<ThemeWrapper {theme} {refresh}>
  <Header {...headerprops} expand={channel.current === 0} bgSrc={`https://picsum.photos/id/${theme === 'dark' ? '1001' : '1082'}/1440/600`}>
    <h1>Svelte Component Library</h1>
  </Header>

  <ColumnLayout {links} currentIndex={channel.current} >
    <Channels {...channel} />
  </ColumnLayout>

  <Footer />
</ThemeWrapper>
