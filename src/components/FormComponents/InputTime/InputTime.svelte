<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount } from 'svelte';
  import { validateTime } from '../../../js'

  //--------------------------- COMPONENT PROPS
  /**
   * onChange event
  */
  export let onChange = null
  /**
   * onKeyPress event
  */
  export let onKeypress = null
  /**
   * updateForm event
  */  
  export let updateForm = null;    
  
  /**
   * 
  */  
  export let placeholder = null
  /**
   * 
  */  
  export let value = ''
  /**
   * 
  */  
  export let key = null
  /**
   * 
  */
  export let label = null;
  /**
   * 
  */  
  export let minTime = null;
  /**
   * 
  */  
  export let maxTime = null;    
  /**
   * 
  */  
  export let required = null;
  //---------------------------

  //--------------------------- VARS
  let errors = [];
  const props = {
    id:key,
    placeholder,    
  }


  //--------------------------- ONMOUNT
	onMount(() => {
    updateParent(value)
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS
  const onChangeEventHandler = () => {   
    onChange && onChange(value)
    updateParent(value)
  }

  const onKeypressHandler = (e) => {
    setTimeout(() => {
      onKeypress && onKeypress(value)
      updateParent(value)
    })
  }
  //---------------------------

  //--------------------------- FUNCTIONS
  const updateParent = (val) => {        
    const {isValid, validationErrors} = validateTime({value, required, minTime, maxTime})
    errors = validationErrors
    updateForm && updateForm({key, val, isValid, errors})
  }
  //---------------------------


</script>

<div class='inputdate-container' class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <label for={key} >{label}</label>
  {/if}
  
  <input type='time' {...props} on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:value  />  

</div>

<style lang="scss">
  .inputdate-container {    
    margin-bottom: 10px;
    width: 100%;
    
    label{
      font-size: 10px;
      margin-bottom: 2px;
      display: flex;
    }

    input{
      height: 30px;
      width: calc(100% - 20px);
      padding: 0 10px;
    }

    &.valid{
      label{
        color: black
      }
      input{
        color: black;
        border: 1px solid black;
      }
    }

    &.invalid{
      label{
        color: red
      }
      input{
        color: red;
        border: 1px solid red;
      }
    }
  }  
</style>
