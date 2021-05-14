<script lang='ts'>
  import ProductCard from '../../../components/ProductCard/ProductCard'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
</script>

<h1>Loader</h1>
<hr>

<CodeBlock title='Properties:' snippet={
  `
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
  `} />



<LibraryBlock title="Default:">
  <div style='height: 400px'>
    <ProductCard />
  </div>
</LibraryBlock>



<CodeBlock open title='Example:' snippet={`
  <div style='height: 400px'>
    <ProductCard />
  </div>
  `} />  


