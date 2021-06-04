<script>
  import ShoppingCart from '@shopping/ShoppingCart.svelte'

  const items = [
    {name: 'Product 1', price: 25.99, quantity: 1},
    {name: 'Product 2', price: 25.99, quantity: 1},
    {name: 'Product 3', price: 20.99, quantity: 1},
    {name: 'Product 4', price: 10.25, quantity: 1}
  ]

  const onClick = (index) => {
    const parts = window.location.hash.split('&product=')
    window.location.hash = `${parts[0]}&product=${index}` 
  }

</script>

<div class='sc-shopping'>
  <ShoppingCart {items} {onClick} />  
</div>

<style lang='scss' scoped>
  .sc-shopping{
    margin-top: 0px
  }
</style>
