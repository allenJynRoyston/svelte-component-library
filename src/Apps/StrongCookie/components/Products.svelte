<script lang='ts'>
  import {onMount, getContext} from 'svelte';
  import GridLayout from '../../../components/Layout/GridLayout.svelte'
  import ProductCard from '../../../components/ProductCard/ProductCard.svelte'

  const indexdb:any = getContext('indexdb')
  let items:any = []
  let products:any = [];

  onMount(async() => {
    products = await indexdb.getAll('products')
    products.forEach((x, index) => {
      const {name, price, description} = x
      items = [...items, {component: ProductCard, row: 2, column: index === 0 ? 2 : 1, props:{onInfoBtn, onPurchaseBtn, name, price, description} }]
    })  
  })


  const onInfoBtn = (index) => {
    const parts = window.location.hash.split('&product=')
    window.location.hash = `${parts[0]}&product=${products[index]._id}`
  }

  const onPurchaseBtn = (index) => {
    console.log(index)
  } 





</script>

<div class='products'>
  <GridLayout {items} outline/>  
</div>


<style lang='scss' scoped>
  .products{
    width: 100%;    
  }
</style>
