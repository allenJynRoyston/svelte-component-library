<script lang='ts'>
  import ProductCard from '../../../components/ProductCard/ProductCard'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'
</script>

<h1>Loader</h1>
<hr>

<ThemeWrapper theme='light' delay={1} lock>
  <LibraryBlock title="Light Theme:">
    <div style='height: 400px'>
      <ProductCard />
    </div>
  </LibraryBlock>
</ThemeWrapper>

<ThemeWrapper theme='dark' delay={1} lock>
  <LibraryBlock title="Dark Theme:">
    <div style='height: 400px'>
      <ProductCard />
    </div>
  </LibraryBlock>
</ThemeWrapper>


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

<CodeBlock open title='Example:' snippet={`
  <div style='height: 400px'>
    <ProductCard />
  </div>
  `} />  


