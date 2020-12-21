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
  export let type = null  
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
  export let allowShowToggle = true;  
  /**
   * 
  */  
  export let minLength = null;
  /**
   * 
  */  
  export let maxLength = null;
  //---------------------------

  //--------------------------- VARS
  let errors = [];
  const props = {
    id:key,
    placeholder,    
  }

  let showPassword = false

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

<div class='input-container' data-testid='input-container' class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <label for={key} >{label}</label>
  {/if}
  
  {#if type === 'password'}
    {#if showPassword}
      <input type='text' {...props} on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:value  />  
    {:else}
      <input type='password' {...props} on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:value  />  
    {/if}

    {#if allowShowToggle}
      <button on:click={(e) => {e.preventDefault(); showPassword = !showPassword}} >{showPassword ? 'Hide' : 'Show'} Password</button>  
    {/if}

  {:else if type === 'number'}
    <input type='number' {...props} on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:value  />
  {:else}
    <input type='text' {...props} on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:value  />
  {/if}
</div>

<style lang="scss">
  .input-container {    
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

      &::placeholder{
        color: lightgrey;
      }
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
