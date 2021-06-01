<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';
  
  import ShoppingCart from '@components/ShoppingCart/ShoppingCart.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  let eventLog = []
  const events = {
    onClick: (val) => {      
      eventLog = [...eventLog, {action: 'onClick', val}]
    }, 
    onRemove: (val) => {
      eventLog = [...eventLog, {action: 'onRemove', val}]
    }
  }

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

    <ShoppingCart {items} {onClick} ${propstr}${selectstr}${inputstr}/>
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

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {events} {eventLog}>
  <div slot='liveexample'>    
    <ShoppingCart {items} {onClick}  {...props} {...selectprops} {...inputprops} {...events}/>
   </div>    
</LibrarySnippet>


