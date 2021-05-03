<script lang='ts'>
  import HashWatch from '../../../components/URLWatcher/HashWatch.svelte'
  import {getContext} from 'svelte';

  const indexdb:any = getContext('indexdb')
  let productId = null;
  let product:any

  const onChange = async({params}) => {
    if(params?.product){
      productId = params?.product
      product = await indexdb.get('products', 0)
    }
  }
</script>

<HashWatch onChange={onChange}/>

{#if !!product && productId}
  <div class='product-details'>
    <h3>Product name: <strong>Item {JSON.stringify(product)}</strong></h3>    
  </div>
{:else}
  <p>Invalid product id</p>
{/if}


<style lang='scss' scoped>

</style>
