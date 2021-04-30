<script>
  import Channels from '../../../components/Channels/Channels'
  import HashWatch from '../../../components/URLWatcher/HashWatch'

  import Checkout from '../components/Checkout'
  import ProductDetails from '../components/ProductDetails'
  import TwoSlot from '../../../components/TwoSlot/TwoSlot'
  
  const channelProps = {
     data: [
      {content: Checkout, render: false, active: false},
      {content: ProductDetails, render: false, active: false},
    ],
    current: 0,
    transition: {
      ease: 'cubicOut',
      speed: 400
    },
    channelReady: (index) => {
      channelProps.data = channelProps.data.map((x, i) => {
        x.active = false;
        if(i === index){
          x.active = true;
          x.render = true;
        }
        return x
      })      
    },
    afterUpdate: () => {
      
    }
  }    

  const gotoChannel = (index) => {
    channelProps.current = index
  }  

  const onChange = ({params}) => {
    if(params?.product){
      gotoChannel(1)
    }
    else{
      gotoChannel(0)
    }
  }

</script>

<TwoSlot showRight={channelProps.current === 1} >
  <h1>Checkout</h1>
  <div slot='right'>
    <button style="cursor: pointer" on:click={() => {window.history.back()}}>Back</button>
  </div>
</TwoSlot>
<hr>

<HashWatch {onChange} />
<Channels {...channelProps} />