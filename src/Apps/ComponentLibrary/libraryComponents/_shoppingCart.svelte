<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
  
  import ShoppingCart from '@components/ShoppingCart/ShoppingCart.svelte'

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

<TwoSlot showLeft showRight>
  <h2>ShoppingCart</h2>
  <div slot='right' style='display: flex; gap 10px'>
  </div>
</TwoSlot>
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

