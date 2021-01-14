<script>
  export let style = null;

</script>

<div class='threecolumn' {style}>

  <div class='threecolumn__left'>
    <slot name='left' />
  </div>

  <div class='threecolumn__center'>
    <slot />
  </div>

  <div class='threecolumn__right'>
    <slot name='right' />
  </div>
</div>

<style lang='scss' scoped>
  .threecolumn{
    width: 100%;
    display: flex;
    align-items: center;

    &__left{
      display: flex;
      align-items: center;    
      width: auto;                    
    }

    &__center{
      width: calc(100% - 20px);
      padding: 5px 10px;
    }    

    &__right {
      width: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex-wrap: none;
    }


  }
</style>