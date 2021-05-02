<script>
  export let style = null;
  export let showRight = false;
  export let showLeft = false

</script>

<div class='two-slot' {style}>

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

    .left{
      display: flex;
      align-items: center;    
      width: 100%;                      
    }

    .right{
      width: auto;
    }    

  }
</style>