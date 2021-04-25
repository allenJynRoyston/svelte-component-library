<script>
  import Channels from '../Channels/Channels'
  import Link from '../Link/Link'
  import HashWatch from '../URLWatcher/HashWatch'

  import Buttom from './sections/_button'
  import Header from './sections/_header'
  import Footer from './sections/_footer'
  import Loader from './sections/_loader'
  import LinkAlias from './sections/_link'
  import FormExample from './sections/_formExample'
  import Search from './sections/_search'
  import HashWatchAlias from './sections/_hashwatch'
  import SVG from './sections/_svg'
  import ThreeSlot from './sections/_threeslot'
  import ChannelAlias from './sections/_channels'
  
  export let startOn = null;
  
  let hashWatchValue = null;

  const data =  [     
    {content: Header, title: "Header", render: false, active: false},
    {content: Footer, title: "Footer", render: false, active: false},
    {content: Buttom, title: "Button", render: false, active: false},
    {content: Loader, title: "Loader", render: false, active: false},
    {content: LinkAlias, title: "Link", render: false, active: false},
    {content: FormExample, title: "Form", render: false, active: false},
    {content: Search, title: "Search", render: false, active: false},
    {content: HashWatchAlias, title: "HashWatch", render: false, active: false},
    {content: SVG, title: "SVG", render: false, active: false},
    {content: ThreeSlot, title: "ThreeSlot", render: false, active: false},
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
