<script>
  import HashWatch from '../../../components/URLWatcher/HashWatch'

  let productId = null;

  const onChange = ({params}) => {
    if(params?.product){
      productId = params?.product
    }
  }

</script>

<HashWatch onChange={onChange}/>

{#if !!productId}
  <div class='product-details'>
    <h3>Product name: <strong>Item {productId}</strong></h3>    
  </div>
{:else}
  <p>Invalid product id</p>
{/if}


<style lang='scss' scoped>

</style>
