<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import ProductCard from '@components/ProductCard/ProductCard.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'ProductCard',
    importName: '@components/ProductCard/ProductCard.svelte',
    properties: `
    export let style = null;
    export let imgSrc = 'https://picsum.photos/200/200';
    export let name = 'Product'
    export let description = 'Description'
    export let price = 'Price'
    export let infoText = 'More'
    export let purchaseText = 'Buy';
    export let index = null;
    export let onInfoBtn = () => {}
    export let onPurchaseBtn = () => {}
    `
  }

  $: livecode = `    
    <ProductCard${fullstr}/>
     `

</script>

<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <div style='height: 400px'>
      <ProductCard />
    </div>
   </div>    
</LibrarySnippet>



