<script>
  import ShoppingCart from '../../../components/ShoppingCart/ShoppingCart'
  import LibraryBlock from './__LibraryBlock'

  const items = [
    {name: 'Product 1', price: 25.99, quantity: 1},
    {name: 'Product 2', price: 25.99, quantity: 1},
    {name: 'Product 3', price: 20.99, quantity: 1},
    {name: 'Product 4', price: 10.25, quantity: 1}
  ]

  const onClick = (index) => {
    console.log(items[index])
  }

</script>

<h1>Shopping Cart</h1>
<hr>

<LibraryBlock section >
  <ShoppingCart {items} {onClick} />
</LibraryBlock>
