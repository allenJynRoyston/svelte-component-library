<script lang='ts'>
  export let show = false
</script>

{#if show}
  <div class="loader">
    <div class="line" />
  </div>
{/if}

<style lang='scss' scoped>

.loader {
  background: #ccc;
  width: 100%;
  height: 10px;
  border-radius: 10px;
  position: relative;
}

.line {
  background: #000;
  border-radius: 10px;
  position: absolute;
  left: 0;
  z-index: 1;
  width: 100px;
  height: 10px;
  animation: line-bounce 1s infinite;
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