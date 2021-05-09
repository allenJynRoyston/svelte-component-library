<script lang='ts'>
  import {setContext} from 'svelte';
  import Header from '../../components/Header/Header.svelte'
  import Footer from '../../components/Footer/Footer.svelte'  
  import ColumnLayout from '../../components/Layout/ColumnLayout.svelte'
  import Channels from '../../components/Channels/Channels.svelte'
  import HashWatch from '../../components/URLWatcher/HashWatch.svelte'
  import SnackBar from '../../components/Snackbar/Snackbar.svelte'
  import { createChannel } from '../../js/utility'

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

   //--------------------------- CHANNEL
  const channel = createChannel({data: [
    {content: HeaderAlias},
    {content: FooterAlias},
    {content: ButtonAlias},
    {content: LoaderAlias},
    {content: AccordionAlias},    
    {content: ProductCard},
    {content: LinkAlias},
    {content: FormAlias},
    {content: SearchAlias},
    {content: HashWatchAlias},
    {content: SVGAlias},
    {content: ThreeSlotAlias},
    {content: TwoSlotAlias},
    {content: ChannelAlias},
    {content: ChannelButtonAlias},
    {content: GridLayoutAlias},
    {content: ColumnLayoutAlias},
    {content: ShoppingCartAlias},
    {content: SnackbarAlias},
    {content: IndexDBAlias},
    {content: CodeBlockAlias},    
  ]})   

  const hrefroot = '#components?component'

  const links = [
    {title: 'Header', href: `${hrefroot}=header` },    
    {title: 'Footer', href: `${hrefroot}=footer` },
    {title: 'Button', href: `${hrefroot}=button` },
    {title: 'Loader', href: `${hrefroot}=loader` },
    {title: 'Accordion', href: `${hrefroot}=accordion` },        
    {title: 'ProductCard', href: `${hrefroot}=productcard` },
    {title: 'Link', href: `${hrefroot}=link` },
    {title: 'Form', href: `${hrefroot}=form` },
    {title: 'Search', href: `${hrefroot}=search` },
    {title: 'HashWatch', href: `${hrefroot}=hashwatch` },
    {title: 'SVG', href: `${hrefroot}=svg` },
    {title: 'ThreeSlot', href: `${hrefroot}=threeslot` },
    {title: 'TwoSlot', href: `${hrefroot}=twoslot` },
    {title: 'Channels', href: `${hrefroot}=channels` },
    {title: 'ChannelButton', href: `${hrefroot}=channelbutton` },
    {title: 'GridLayout', href: `${hrefroot}=gridlayout` },
    {title: 'ColumnLayout', href: `${hrefroot}=columnlayout` },
    {title: 'ShoppingCart', href: `${hrefroot}=shoppingcart` },
    {title: 'Snackbar', href: `${hrefroot}=snackbar`},
    {title: 'IndexDB', href: `${hrefroot}=indexdb` },
    {title: 'Codeblock', href: `${hrefroot}=codeblock` },
  ]

  const onChange = ({params}) => {       
    const index = links.findIndex(link => {
      return link?.title.toLowerCase() === params?.component
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
  
</script>

<HashWatch onChange={onChange}/>
<SnackBar {snack} />

<Header>
  <h1>Svelte Component Library</h1>
</Header>

<ColumnLayout {links} currentIndex={channel.current} >
  <Channels {...channel} />
</ColumnLayout>


<Footer />


