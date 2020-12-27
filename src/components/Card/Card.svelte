<script lang='ts'>
  //--------------------------- IMPORTS  
  import { onMount } from 'svelte';

  //--------------------------- COMPONENT PROPS
  /**
   * onChange event
  */
  export let onChange = null
  //---------------------------

  //--------------------------- VARS

  
  //--------------------------- ONMOUNT
	onMount(() => {

  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS

  //---------------------------

  //--------------------------- FUNCTIONS

  //---------------------------

</script>

<div class='card-container'>
  <div class='card-container__header'>
    <slot name='header'>
    </slot>
  </div>

  <div class='card-container__body'>
    <slot>
      <p>Lorem ipsum</p>
    </slot>
  </div>
  

  <div class='card-container__footer'>
    <slot name='footer'>
    </slot>
  </div>  

</div>  

<style lang='scss'>
  .card-container{
    border: 1px solid black;
    overflow: hidden;
    display: block;

    &__header{
      font-size: 40px;
    }

    &__footer{
      font-size: 32px;
    }

    &__header, &__footer{
      background: black;
      color: white;      
      padding: 10px;
    }  

    &__body{
      padding: 10px; 
    }
  }

      
</style>

