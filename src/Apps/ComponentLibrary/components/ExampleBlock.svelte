<script lang='ts'>
  import {getContext} from 'svelte';

  import LoremBlock from '@base/LoremBlock.svelte';
  import ThemeWrapper from '@layout/ThemeWrapper.svelte';

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