<script lang='ts'>
  import {getContext} from 'svelte';
  import Footer from '@layout/Footer.svelte'
  import ColorBlock from '@base/ColorBlock.svelte'
  import GridLayout from '@layout/GridLayout.svelte'
  import Section from '@layout/Section.svelte'
  import Accordian from '@base/Accordion.svelte'

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

<Section>
  <section>

    <h1>
      Colors:
    </h1>
    <hr>
    <br><br>
    
    {#each Object.entries(colorBlocks) as [key]}
      <Accordian full open>

        <div slot='title'>
          <h2 class='color-title'>{key}:</h2>                   
        </div>
    
        <div slot='content'>
          <Section>
              <GridLayout size={125} outline items={colorBlocks[key].items} />
          </Section>           
        </div>
      </Accordian>
    {/each}
  </section>

</Section>

<Footer />



<style lang='scss'>
  @import "../../../scss/src/_media-queries.scss";

  .color-title{
    text-transform: capitalize
  }

  section{
    padding: 50px 0;
    max-width: 900px;
    margin: auto;

    @include tablet-landscape-and-below {
      padding: 20px 0;
    }

  }  

</style>