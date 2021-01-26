<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount, tick } from 'svelte';
  import Button from '../../Button/Button.svelte'
  import { validateInputFile } from '../../../js'

  //--------------------------- COMPONENT PROPS
  /**
   * onChange event
  */
  export let onChange = null
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
  export let required = null;
  /**
   * 
  */    
  export let accept = null

  //---------------------------

  //--------------------------- VARS
  let errors = [];
  const props = {
    id:key,
    placeholder,    
  }
  let render = true;
  let hasFormData = false

  //--------------------------- ONMOUNT
	onMount(() => {
    updateParent(null)
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS
  const onChangeEventHandler = (e) => {       
    hasFormData = true
    let formData = new FormData();    
    formData.append(`file`, e.target.value)
    onChange && onChange(formData)
    updateParent(formData)
  }

  const clearInput = async() => {
    render = false;
    await tick();
    render = true;
    hasFormData = false;
    updateParent(null)
  }
  //---------------------------

  //--------------------------- FUNCTIONS
  const updateParent = (formData) => {       
    const {isValid, validationErrors} = validateInputFile({formData, required})
    errors = validationErrors
    updateForm && updateForm({key, val: formData, isValid, errors})
  }
  //---------------------------


</script>

<div class='fileinput-container' data-testid='fileinput-container' class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <label for={key} >{label}</label>
  {/if}
  
  {#if render}
    <input type='file' {accept} {...props} on:change={onChangeEventHandler} bind:value  />  
  {/if}

  {#if hasFormData}
    <Button onClick={clearInput}>X</Button>
  {/if}
</div>

<style lang="scss">
  .fileinput-container {    
    margin-bottom: 10px;
    width: 100%;
    
    label{
      font-size: 10px;
      margin-bottom: 2px;
      display: flex;
    }

    input{
      height: 30px;
      border: none;

      &::placeholder{
        color: lightgrey;
      }
    }

    &.valid{
      label{
        color: black
      }
    }

    &.invalid{
      label{
        color: red
      }
    }

  }
  
</style>
