<script>
  import GridLayout from '../../../components/Layout/GridLayout'
  import ProductCard from '../../../components/ProductCard/ProductCard'

  const onInfoBtn = (index) => {
    const parts = window.location.hash.split('&product=')
    window.location.hash = `${parts[0]}&product=${index}`
  }

  const onPurchaseBtn = (index) => {
    console.log(index)
  } 

  export let items = [
    {component: ProductCard, row: 2, column: 2, props:{onInfoBtn, onPurchaseBtn, title: 'Strong Cookie', price: '100.00$', infoText: 'Info'} }, 
    {component: ProductCard, row: 2, column: 1, props:{onInfoBtn, onPurchaseBtn, title: 'Stronger Cookie', price: '100.00$', infoText: 'Info'} }, 
    {component: ProductCard, row: 2, column: 1, props:{onInfoBtn, onPurchaseBtn, title: 'Strongest Cookie', price: '100.00$', infoText: 'Info'} }
  ]


</script>

<div class='products'>
  <GridLayout {items} outline/>  
</div>


<style lang='scss' scoped>
  .products{
    width: 100%;    
    height: auto;
  }
</style>
