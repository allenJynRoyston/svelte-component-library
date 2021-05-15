<script lang='ts'>
  import ShoppingCart from '@components/ShoppingCart/ShoppingCart.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

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

<CodeBlock open title='Import:' snippet={`
  import ShoppingCart from '@components/ShoppingCart/ShoppingCart.svelte'
  `} />

<CodeBlock title='Properties:' snippet={`
  export let items = []
  export let onClick = (index) => {};
  `} />


<LibraryBlock title="Default:">
  <ShoppingCart {items} {onClick} />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  const items = [
    {name: 'Product 1', price: 25.99, quantity: 1},
    {name: 'Product 2', price: 25.99, quantity: 1},
    {name: 'Product 3', price: 20.99, quantity: 1},
    {name: 'Product 4', price: 10.25, quantity: 1}
  ]

  const onClick = (index) => {
    console.log(items[index])
  }

  <ShoppingCart {items} {onClick} />
  `} />  

