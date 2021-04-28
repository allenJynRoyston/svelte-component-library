<script>
  export let style = null;
  export let showRight = false;

</script>

<div class='two-slot' {style}>

  <div class='left'>
    <slot>Left</slot>
  </div>

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