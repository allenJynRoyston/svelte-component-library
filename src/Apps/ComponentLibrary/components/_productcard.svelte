<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import ProductCard from '@components/ProductCard/ProductCard.svelte'

</script>

<TwoSlot showLeft showRight>
  <h2>ProductCard</h2>
  <div slot='right' style='display: flex: 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import ProductCard from '@components/ProductCard/ProductCard'
  `} />

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


