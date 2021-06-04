<script lang='ts'>
  import {getContext} from 'svelte';

  export let style = null;
  export let hideLeft = false;
  export let hideRight = false;
  export let hideContent = false;
  export let outline = false; 
  export let rounded = false;

  const theme:string = getContext('theme');
</script>

<div class={`three-slot ${theme}-theme`} class:outline={outline} class:rounded={rounded} {style}>

  {#if !hideLeft}
    <div class='left'>
      <slot name='left' />
    </div>
  {/if}
  
    <div class='center'>
      {#if !hideContent}
        <slot name='center' />
      {/if}
    </div>


  {#if !hideRight}
    <div class='right'>
      <slot name='right' />
    </div>
  {/if}
</div>

<style lang='scss' scoped>
  .three-slot{
    width: calc(100% - 20px);
    display: flex;
    align-items: center;
    padding: 5px 10px;


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
      width: auto;                    
    }

    .center{
      width: calc(100% - 20px);
    }    

    .right {
      width: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex-wrap: none;
    }


  }
</style>