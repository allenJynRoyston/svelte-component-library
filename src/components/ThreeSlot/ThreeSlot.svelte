<script>
  export let style = null;
  export let showLeft = false;
  export let showRight = false;
  export let outline = false; 
  export let rounded = false;
</script>

<div class={`root-component three-slot`} class:outline={outline} class:rounded={rounded} {style}>

  {#if showLeft}
    <div class='left'>
      <slot name='left' />
    </div>
  {/if}
  
  <div class='center'>
    <slot />
  </div>

  {#if showRight}
    <div class='right'>
      <slot name='right' />
    </div>
  {/if}
</div>

<style lang='scss' scoped>
  .three-slot{
    width: 100%;
    display: flex;
    align-items: center;

    &.outline{
      width: calc(100% - 20px);
      padding: 0 10px;
      border: 3px solid var(--black-1);
    }

    &.rounded{
      border-radius: 20px;
    }

    &.dark-theme{
      &.outline{
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
      padding: 5px 10px;
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