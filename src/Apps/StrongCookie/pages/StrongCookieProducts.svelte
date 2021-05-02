<script>
  import Channels from '../../../components/Channels/Channels'  
  import HashWatch from '../../../components/URLWatcher/HashWatch'
  import TwoSlot from '../../../components/TwoSlot/TwoSlot'
  import { createChannel } from '../../../js/utility'

  import Products from '../components/Products.svelte'
  import ProductDetails from '../components/ProductDetails'
  //--------------------------- 

  //--------------------------- CHANNEL
  const channel = createChannel({
    data: [
      {content: Products},
      {content: ProductDetails}
    ]  
  }) 

  const gotoChannel = (index) => {
    channel.current = index
  }  

  const onChange = ({params}) => {        
    gotoChannel(params?.product ? 1 : 0)    
  }  
  //---------------------------


</script>


<HashWatch {onChange} />

<TwoSlot showRight={channel.current === 1} >  
  <h1>Products</h1>     
  <div slot='right'>
    <button style="cursor: pointer" on:click={() => {window.history.back()}}>Back</button>
  </div>
</TwoSlot>
<hr>

<Channels {...channel} />
