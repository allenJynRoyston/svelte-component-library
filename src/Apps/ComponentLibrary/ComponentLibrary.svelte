<script>
  import Channels from '../../components/Channels/Channels'
  import Link from '../../components/Link/Link'

  import ButtonAlias from './sections/_button'
  import HeaderAlias from './sections/_header'
  import FooterAlias from './sections/_footer'
  import LoaderAlias from './sections/_loader'
  import LinkAlias from './sections/_link'
  import FormAlias from './sections/_formExample'
  import SearchAlias from './sections/_search'
  import HashWatchAlias from './sections/_hashwatch'
  import SVGAlias from './sections/_svg'
  import ThreeSlotAlias from './sections/_threeslot'
  import ChannelAlias from './sections/_channels'
  
  export let startOn = null;
  
  const data =  [     
    {content: HeaderAlias, title: "Header", render: false, active: false},
    {content: FooterAlias, title: "Footer", render: false, active: false},
    {content: ButtonAlias, title: "Button", render: false, active: false},
    {content: LoaderAlias, title: "Loader", render: false, active: false},
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

<div class='library'>
  <div class='directory'>
    {#each channelProps.data as { title, active }, i}
      <Link active={active} href={`#library?component=${title.toLowerCase()}`} onClick={() => {gotoChannel(i)}}>
        {title}
      </Link>
    {/each}
  </div>

  <div class='channel-container'>
    <Channels {...channelProps} />
  </div>
</div>

<style lang='scss' scoped>
  .library{
    width: 100%;
    display: flex;
    overflow: auto;

    .directory{
      width: auto;
      height: 100vh;
      padding: 10px 50px 10px 10px;
      display: flex;
      flex-direction: column;
      background: grey;
      color: white;

      a{
        margin: 2px 0;
        cursor: pointer;
        &.active{
          color: red;
        }
      }
    }

    .channel-container{      
      width: 100%;
      padding: 10px;
      overflow: hidden;
    }
  }


</style>
