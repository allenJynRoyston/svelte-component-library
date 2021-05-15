<script lang='ts'>
  import {getContext} from 'svelte';
  import Footer from '@components/Footer/Footer.svelte'
  import ColorBlock from '@components/ColorBlock/ColorBlock.svelte'
  import GridLayout from '@components/Layout/GridLayout.svelte'
  import Section from '@components/Section/Section.svelte'
  import Accordian from '@components/Accordion/Accordion.svelte'

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

<Section paddingTop>
  <h1>
    Colors:
  </h1>
  <hr>
  <br><br>
  
  {#each Object.entries(colorBlocks) as [key]}
    <Accordian fill open>

      <div slot='title'>
        <h2 class='color-title'>{key}:</h2>                   
      </div>
  
      <div slot='content'>
        <Section>
          <GridLayout outline items={colorBlocks[key].items} />
        </Section>           
      </div>
    </Accordian>
  {/each}

</Section>

<Footer />



<style lang='scss'>

  .color-title{
    text-transform: capitalize
  }

</style>