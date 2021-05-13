<script lang='ts'>
  import ShoppingCart from '../../../components/ShoppingCart/ShoppingCart.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte';

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

<LibraryBlock title="Default:">
  <ShoppingCart {items} {onClick} />
</LibraryBlock>

<ThemeWrapper theme='dark' delay={1}>
  <LibraryBlock title="Dark Theme:">
    <ShoppingCart {items} {onClick} />
  </LibraryBlock>
</ThemeWrapper>

<CodeBlock title='Properties:' snippet={`
  export let items = []
  export let onClick = (index) => {};
`} />

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

