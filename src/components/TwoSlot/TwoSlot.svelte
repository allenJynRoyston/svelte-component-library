<script>
  export let style = null;
  export let showRight = false;
  export let showLeft = false
  export let outline = false; 
  export let rounded = false;
</script>

<div class={`root-component two-slot`} class:outline={outline} class:rounded={rounded} {style}>

  {#if showLeft}
    <div class='left'>
      <slot>Left</slot>
    </div>
  {/if}

  {#if showRight}
    <div class='right'>
      <slot name='right' >
        Right
      </slot>
    </div>
  {/if}
</div>

<style lang='scss' scoped>
  .two-slot{
    width: 100%;
    display: flex;
    align-items: center;

    &.outline{
      width: calc(100% - 20px);
      padding: 10px;
      border: 3px solid #333;
    }

    &.rounded{
      border-radius: 20px;
    }

    &.dark-theme{
      &.outline{
        border: 3px solid white;
      }
    }

    .left{
      display: flex;
      align-items: center;    
      flex: 1 1 auto;
    }

    .right{
      width: auto;
    }    

  }
</style>