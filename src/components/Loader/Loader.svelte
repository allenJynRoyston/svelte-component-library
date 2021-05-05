<script>
  export let show = false
</script>

{#if show}
  <div class='loader'>
    <p>Loading...</p>
  </div>
{/if}

<style lang='scss'>
  .loader{
    width: 100%;
    padding: 50px 0;
    display: flex;
    justify-content: center;
    align-content: center;
  }

</style>