<script>
  export let style = null;
  export let showLeft = false;
  export let showRight = false;
  export let showCenter = false;

</script>

<div class='three-slot' {style}>

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