<script>
  import Header from '../../components/Header/Header'
  import Footer from '../../components/Footer/Footer'  
  import BasicLayout from '../../components/Layout/BasicLayout'
  import Channels from '../../components/Channels/Channels'
  import Link from '../../components/Link/Link'
  
  import ButtonAlias from './components/_button'
  import HeaderAlias from './components/_header'
  import FooterAlias from './components/_footer'
  import LoaderAlias from './components/_loader'
  import ProductCard from './components/_productcard'
  import LinkAlias from './components/_link'
  import FormAlias from './components/_formExample'
  import SearchAlias from './components/_search'
  import HashWatchAlias from './components/_hashwatch'
  import SVGAlias from './components/_svg'
  import ThreeSlotAlias from './components/_threeslot'
  import ChannelAlias from './components/_channels'
  
  export let startOn = null;
  
  const data =  [     
    {content: HeaderAlias, title: "Header", render: false, active: false},
    {content: FooterAlias, title: "Footer", render: false, active: false},
    {content: ButtonAlias, title: "Button", render: false, active: false},
    {content: LoaderAlias, title: "Loader", render: false, active: false},
    {content: ProductCard, title: "ProductCard", render: false, active: false},
    {content: LinkAlias, title: "Link", render: false, active: false},
    {content: FormAlias, title: "Form", render: false, active: false},
    {content: SearchAlias, title: "Search", render: false, active: false},
    {content: HashWatchAlias, title: "HashWatch", render: false, active: false},
    {content: SVGAlias, title: "SVG", render: false, active: false},
    {content: ThreeSlotAlias, title: "ThreeSlot", render: false, active: false},
    {content: ChannelAlias, title: "Channels", render: false, active: false},
  ]

  const current = data.findIndex(x => x.title.toLowerCase() === startOn) < 0 ? 0 : data.findIndex(x => x.title.toLowerCase() === startOn)

  const channelProps = {
    data,
    current,
    transition: {
      ease: 'cubicOut',
      speed: 400
    },
    channelReady: (index) => {
      channelProps.data = channelProps.data.map((x, i) => {
        x.active = false;
        if(i === index){
          x.render = true
          x.active = true
        }
        return x
      })      
    },
    afterUpdate: () => {}
  }   

  const gotoChannel = (index) => {
    channelProps.current = index
  }
  
</script>

<Header>
  <h1>Svelte Component Library</h1>
</Header>
<BasicLayout >
  <div slot='directory'>
    <div class='column'>
      {#each channelProps.data as { title, active }, i}
        <Link active={active} href={`#library?component=${title.toLowerCase()}`} onClick={() => {gotoChannel(i)}}>
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

