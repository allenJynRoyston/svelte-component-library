<script lang='ts'>
  import {getContext} from 'svelte';

  import Button from '@components/Button/Button.svelte'
  import Accordion from '@components/Accordion/Accordion.svelte'
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte';
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte';
  import Section from '../../../components/Section/Section.svelte';

  const theme:string = getContext('theme')


</script>


<div class={`example-block ${theme}-theme`}>
  <ThemeWrapper invert>
    <LoremBlock />
  </ThemeWrapper>
    
  <LoremBlock />

  <ThemeWrapper invert>
    <LoremBlock />
  </ThemeWrapper>
  
  <LoremBlock />

  <ThemeWrapper invert>
    <LoremBlock />
  </ThemeWrapper>  
</div>

<style lang='scss' scoped>
  .example-block{
    // padding: 20px;
    // background:var(--white-1);
    // color: var(--white-1-text);

    h4{
      margin-top: 20px;
    }
  }
</style>