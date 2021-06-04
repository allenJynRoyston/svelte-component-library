<script lang='ts'>
  import {onMount, getContext} from 'svelte';
  import GridLayout from '@layout/GridLayout.svelte'
  import ProductCard from '@cards/ProductCard.svelte'
  
  const addSnack:any =getContext('addSnack')
  const indexdb:any = getContext('indexdb')

  let items:any = []
  let products:any = [];

  onMount(async() => {
    products = await indexdb.getAll('products')
    products.forEach((x, index) => {
      const {name, price, description, imgSrc} = x
      items = [...items, 
        {
          component: ProductCard, 
          row: index === 0 ? 2 : 1, 
          column: index === 0 ? 2 : 1, 
          props:{onInfoBtn, onPurchaseBtn, name, imgSrc, price, description} 
        }
      ]
    })  
  })


  const onInfoBtn = (index) => {
    const parts = window.location.hash.split('&product=')
    window.location.hash = `${parts[0]}&product=${products[index].urlName}`
  }

  const onPurchaseBtn = (index) => {
    addSnack({message: `Added ${products[index].name} to shopping cart!`, duration: 4000, type: 'primary'})
  } 


</script>

<div class='products'>
  <GridLayout {items} size={250} gap={5}/>  
</div>


<style lang='scss' scoped>
  .products{
    width: 100%;    
  }
</style>
