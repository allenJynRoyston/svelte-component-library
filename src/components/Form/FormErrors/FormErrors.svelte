<script lang='ts'>  
  //--------------------------- IMPORTS  
  //--------------------------- VARS

  //--------------------------- COMPONENT PROPS
  /**
   * errors
  */
  export let errors = [];
  //---------------------------

  //--------------------------- FUNCTIONS
  //---------------------------
  $: numberOfErrors = Object.entries(errors).filter(x => {return  x[1][1].errors.length > 0}).length


</script>


<div class='formerrors-container' class:hide={numberOfErrors === 0}>
  {#each Object.entries(errors) as [key, value]}
    <ul>
      {#if value[1].errors.length > 0}
        <span>{value[0]}</span>
        {#each value[1].errors as {message}}
          <li>{message}</li>
        {/each}
      {/if}
    </ul>
  {/each}
</div>

<style lang="scss">
  .formerrors-container{
    margin-top: 10px;
    
    &.hide{
      display: none
    }

    span{
      text-transform: uppercase;
      font-weight: bold;
      font-size: 14px;
    }
  
    ul{
      li{
        font-size: 12px;
      }
    }
}
</style>
