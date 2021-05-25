<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';
  
  import ShoppingCart from '@components/ShoppingCart/ShoppingCart.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'ShoppingCart',
    importName: '@components/ShoppingCart/ShoppingCart.svelte',
    properties: `
    export let items = []
    export let onClick = (index) => {};
    `
  }

  $: livecode = `    
    const items = [
      {name: 'Product 1', price: 25.99, quantity: 1},
      {name: 'Product 2', price: 25.99, quantity: 1},
      {name: 'Product 3', price: 20.99, quantity: 1},
      {name: 'Product 4', price: 10.25, quantity: 1}
    ]

    const onClick = (index) => {
      alert("clicked on item: " + items[index].name)
    }

    <ShoppingCart {items} {onClick} ${fullstr}/>
     `

  const items = [
    {name: 'Product 1', price: 25.99, quantity: 1},
    {name: 'Product 2', price: 25.99, quantity: 1},
    {name: 'Product 3', price: 20.99, quantity: 1},
    {name: 'Product 4', price: 10.25, quantity: 1}
  ]

  const onClick = (index) => {
    alert("clicked on item: " + items[index].name)
  }

</script>

<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <ShoppingCart {items} {onClick}  {...props} {...selectprops} />
   </div>    
</LibrarySnippet>


