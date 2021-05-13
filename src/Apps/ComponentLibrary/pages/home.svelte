<script lang='ts'>
  import {getContext} from 'svelte';
  import InnerContainer from '../../../components/InnerContainer/InnerContainer.svelte'
  import Footer from '../../../components/Footer/Footer.svelte'
  import Header from '../../../components/Header/Header.svelte'
  import ColorBlock from '../../../components/ColorBlock/ColorBlock.svelte'
  import GridLayout from '../../../components/Layout/GridLayout.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'

  export let headerprops;

  const theme = getContext('theme');
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

<ThemeWrapper {theme} delay={1} lock>
  <div class='home-page'>
    <InnerContainer>

      <Header {...headerprops} expand bgSrc={`https://picsum.photos/id/${theme === 'dark' ? '1082' : '1001'}/1440/600`}>
        <h1>Svelte Component Library</h1>
      </Header>

      <div class='home-section'>
        <h1>
          Colors:
        </h1>
        
        {#each Object.entries(colorBlocks) as [key]}
          <div class='color-blocks'>
            <h2>{key}:</h2>
            <GridLayout outline items={colorBlocks[key].items} />
          </div>
        {/each}

      </div>

      <Footer />
    
    </InnerContainer>
  </div>
</ThemeWrapper>

<style lang='scss'>
  .home-page{
    display: flex;
    flex-direction: column;
    background: var(--black-1);
    color: var(--white-0)
  }

  .home-section{
    min-height: 100vh;
    padding: 10px;
  }

  .color-blocks{
    margin-bottom: 100px;
  }

</style>
  