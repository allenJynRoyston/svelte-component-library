<script lang='ts'>
  import ProductCard from '@cards/ProductCard.svelte'
  import HashWatch from '@core/HashWatch.svelte'
  import {getContext} from 'svelte';

  const indexdb:any = getContext('indexdb')
  let productId = null;
  let product:any

  const onChange = async({params}) => {
    if(params?.product){
      productId = params?.product
      product = await indexdb.get('products', productId)
      console.log(product)
    }
  }
</script>

<HashWatch onChange={onChange}/>

{#if !!product && productId}
  <div class='product-details'>
    <ProductCard {...product} />
  </div>
{:else}
  <p>Invalid product id</p>
{/if}


<style lang='scss' scoped>
  .product-details{
    height: 400px
  }
</style>
