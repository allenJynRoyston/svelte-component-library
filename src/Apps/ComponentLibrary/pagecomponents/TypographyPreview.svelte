<script lang='ts'>
  import {getContext} from 'svelte';
  import Footer from '../../../components/Footer/Footer.svelte'
  import ColorBlock from '../../../components/ColorBlock/ColorBlock.svelte'
  import GridLayout from '../../../components/Layout/GridLayout.svelte'
  const colors = getContext('colors');

  let colorBlocks:any = {}

  for (const [key, value] of Object.entries(colors)) {
    let items = []
    value.forEach(x => {
      const {name, color, textColor} = x;      
      items = [...items, {component: ColorBlock, props: {name, bgColor: color, textColor}}]
    })
    colorBlocks[key] = {
      items
    }
  }

</script>

<div class='typography-preview'>
  <h1>
    Typography:
  </h1>

  {#each Object.entries(colorBlocks) as [key]}
    <div class='color-blocks'>
      <h2>{key}:</h2>
      <GridLayout outline items={colorBlocks[key].items} />
    </div>
  {/each}
</div>

<Footer />



<style lang='scss'>
  .typography-preview{
    padding: 20px;
  }
</style>