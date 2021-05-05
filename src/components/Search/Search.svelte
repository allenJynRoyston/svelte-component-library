<script lang='ts'>
  //--------------------------- IMPORTS  
  import SVG from '../SVG/SVG.svelte'
  import Input from '../FormComponents/Input/Input.svelte'
  import Button from '../Button/Button'
  //---------------------------


  //--------------------------- COMPONENT PROPS  
  //---------------------------

  //--------------------------- APP CONTEXT   
  //---------------------------
      
  //--------------------------- VARS
  //---------------------------

  //--------------------------- ONMOUNT
  //---------------------------     

  //--------------------------- EVENT HANDLERS
  //---------------------------

</script>

<div class='search'>
  <SVG icon='search' />
  <Input noBottomMargin />
</div>  

<style lang='scss'>
  .search{        
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;
    gap: 10px;

    .input-container{
      margin-bottom: 0
    }

  }      
</style>

