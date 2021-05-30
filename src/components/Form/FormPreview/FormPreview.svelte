<script lang='ts'> 
  import {getContext} from 'svelte';
  
  const theme:string = getContext('theme')

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


<div class={`formpreview-container ${theme}-theme`}>  
  <ul>
    {#each previewData as {key, value}}     
      <li><strong>{key}:</strong> {JSON.stringify(value)}</li> 
    {/each}
  </ul>
</div>

<style lang="scss">
  .formpreview-container{
    color: var(--black-2);

    &.dark-theme{
      color: var(--white-0);
    }
    
    &.hide{
      display: none
    }

    span{
      text-transform: uppercase;
      font-weight: bold;
      font-size: 14px;
    }
  
    ul{
      padding: 0;
      margin: 0;
      text-indent: none;
      list-style: none;
      li{
        font-size: 12px
      }
    }
}
</style>