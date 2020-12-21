<script lang='ts'>  
  //--------------------------- IMPORTS  
  //--------------------------- VARS

  //--------------------------- COMPONENT PROPS
  /**
   * errors
  */
  export let data = null;
  //---------------------------

  //--------------------------- FUNCTIONS
  //---------------------------
  $: previewData = Object.entries(data).map(x => {
    return {key: x[0], value: x[1].value }
  })

</script>


<div class='formpreview-container'>  
  <ul>
    <span>Submit</span>
    {#each previewData as {key, value}}     
      <li><strong>{key}:</strong> {JSON.stringify(value)}</li> 
    {/each}
  </ul>
</div>

<style lang="scss">
  .formpreview-container{
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
        font-size: 12px
      }
    }
}
</style>