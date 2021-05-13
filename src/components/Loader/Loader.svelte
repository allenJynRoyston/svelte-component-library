<script lang='ts'>
  export let show = false
  export let rounded = false;
</script>

{#if show}
  <div class={`root-component loader`} class:rounded={rounded}>
    <div class="line" class:rounded={rounded} />
  </div>
{/if}

<style lang='scss' scoped>

.loader {
  background: var(--white-1);
  width: 100%;
  height: 10px;
  
  position: relative;

  &.rounded{
    border-radius: 10px;
  }

  .line {
    background: var(--black-0);
   
    &.rounded{
      border-radius: 10px;
    }

    position: absolute;
    left: 0;
    z-index: 1;
    width: 100px;
    height: 10px;
    animation: line-bounce 1.5s infinite;
  }  

  &.dark-theme{
    background: var(--black-4);
    .line{
      background: var(--black-6);
    }
  }
}



@keyframes line-bounce {
  0%{
    left: calc(100% - 100px);
  }
  50%{
    left: 0;
  }
  100%{
    left: calc(100% - 100px);
  }
}
</style>