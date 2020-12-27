<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount } from 'svelte';
  import { validate } from '../../../js'

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
  export let regex = null;
  /**
   * 
  */  
  export let required = null;
  /**
   * 
  */  
  export let minLength = null;
  /**
   * 
  */  
  export let maxLength = null;
  /*
  *
  */
  export let contentEdit = false
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
    const {isValid, validationErrors} = validate({value, regex, required, minLength, maxLength})
    errors = validationErrors
    updateForm && updateForm({key, val, isValid, errors})
  }
  //---------------------------


</script>

<div class='input-container' test-dataid='input-container' class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <label for={key} >{label}</label>
  {/if}
  
  {#if contentEdit}
    <div class='textarea' contenteditable   on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:innerHTML={value} />  
  {:else}
    <textarea class='textarea' {...props} on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:value  />
  {/if}

</div>

<style lang="scss">
  .input-container {
    width: 100%;
    margin-bottom: 10px;    

    label{
      font-size: 10px;
      margin-bottom: 2px;
      display: flex;
    }

    .textarea{
      height: 30px;
      width: calc(100% - 20px);
      padding: 10px;      
      min-height: 50px;
      border: 1px solid black;
    }

    &.valid{
      label{
        color: black
      }
      .textarea{
        color: black;
        border: 1px solid black;
      }
    }

    &.invalid{
      label{
        color: red
      }
      .textarea{
        color: red;
        border: 1px solid red;
      }
    }

  }
  
</style>
