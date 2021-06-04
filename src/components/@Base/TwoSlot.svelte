<script lang='ts'>
  import {getContext} from 'svelte';

  export let style = null;
  export let hideRight = false;
  export let hideLeft = false
  export let outline = false; 
  export let rounded = false;
  export let nopadding = false;

  const theme:string = getContext('theme');
</script>

<div class={`two-slot ${theme}-theme`} class:nopadding={nopadding} class:outline={outline} class:rounded={rounded} {style}>

    <div class='left'>
      {#if !hideLeft}
        <slot name='left'>
          Left
        </slot>
      {/if}
    </div>
  

  
    <div class='right'>
      {#if !hideRight}
        <slot name='right' >
          Right
        </slot>
      {/if}
    </div>
  
</div>

<style lang='scss' scoped>
  .two-slot{
    width: calc(100% - 20px);
    display: flex;
    align-items: center;
    padding: 5px 10px;
    flex-wrap: wrap;

    &.nopadding{
      width: 100%;
      padding: 0;
    }

    &.outline{
      width: calc(100% - 26px);
      border: 3px solid var(--black-1);
    }

    &.rounded{
      border-radius: 20px;
    }

    &.dark-theme{
      &.outline{
        width: calc(100% - 26px);
        border: 3px solid var(--white-0);
      }
    }

    .left{
      display: flex;
      align-items: center;    
      flex: 1 1 auto;
      padding-right: 20px;
    }

    .right{
      width: auto;
    }    

  }
</style>