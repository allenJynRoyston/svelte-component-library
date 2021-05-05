<script lang='ts'>
  import {setContext} from 'svelte';
  import Header from '../../components/Header/Header.svelte'
  import Footer from '../../components/Footer/Footer.svelte'  
  import ColumnLayout from '../../components/Layout/ColumnLayout.svelte'
  import Channels from '../../components/Channels/Channels.svelte'
  import Link from '../../components/Link/Link.svelte'
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
  import GridLayoutAlias from './components/_gridLayout.svelte'
  import ColumnLayoutAlias from './components/_columnLayout.svelte'
  import ShoppingCartAlias from './components/_shoppingCart.svelte'
  import IndexDBAlias from './components/_idb.svelte'
  import SnackbarAlias from './components/_snackbar.svelte'

   //--------------------------- CHANNEL
  const channel = createChannel({data: [
    {content: HeaderAlias, title: "Header"},
    {content: FooterAlias, title: "Footer"},
    {content: ButtonAlias, title: "Button"},
    {content: LoaderAlias, title: "Loader"},
    {content: ProductCard, title: "ProductCard"},
    {content: LinkAlias, title: "Link"},
    {content: FormAlias, title: "Form"},
    {content: SearchAlias, title: "Search"},
    {content: HashWatchAlias, title: "HashWatch"},
    {content: SVGAlias, title: "SVG"},
    {content: ThreeSlotAlias, title: "ThreeSlot"},
    {content: TwoSlotAlias, title: "TwoSlot"},
    {content: ChannelAlias, title: "Channels"},
    {content: GridLayoutAlias, title: "GridLayout"},
    {content: ColumnLayoutAlias, title: "ColumnLayout"},
    {content: ShoppingCartAlias, title: "ShoppingCart"},
    {content: SnackbarAlias, title: "Snackbar"},
    {content: IndexDBAlias, title: "IndexDB"},
  ]})   

  const gotoChannel = (index) => {
    channel.current = index
  }

  const onChange = ({params}) => {       
    const index = channel.data.findIndex(channel => {
      return channel.title.toLowerCase() === params?.component
    }) 
    gotoChannel(index < 0 ? 0 : index)    
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

<ColumnLayout >
  <div slot='directory'  class='directory'>
    {#each channel.data as { title }, i}
      <Link active={channel.current === i} href={`#library?component=${title.toLowerCase()}`} onClick={() => {gotoChannel(i)}}>
        {title}
      </Link>
    {/each}
  </div>

  <Channels {...channel} />
</ColumnLayout>

<Footer />


<style lang='scss' scoped>
  .directory {
    display: flex; 
    flex-direction: column;
  }
</style>

