<script>
  import Channels from '../../../components/Channels/Channels'  
  import HashWatch from '../../../components/URLWatcher/HashWatch'
  import TwoSlot from '../../../components/TwoSlot/TwoSlot'

  import Products from '../components/Products.svelte'
  import ProductDetails from '../components/ProductDetails'

  let ready = false;

  const channelProps = {
     data: [
      {content: Products, render: false, active: false},
      {content: ProductDetails, render: false, active: false}
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
    ready = true;
    gotoChannel(0)
    if(params?.product){
      gotoChannel(1)
    }
  }

</script>


<HashWatch onChange={onChange}/>

{#if ready}
  <TwoSlot showRight={channelProps.current === 1} >  
    <h1>Products</h1>     
    <div slot='right'>
      <button on:click={() => {window.history.back()}}>Back</button>
    </div>
  </TwoSlot>
  <hr>
  <Channels {...channelProps} />
{/if}