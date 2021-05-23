<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount, tick } from 'svelte';
  import SVG from '@components/SVG/SVG.svelte'
  import Button from '@components/Button/Button.svelte'
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

<div class={`root-component fileinput-container`} data-testid='fileinput-container' class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <label for={key} >{label}</label>
  {/if}
  
  <div class='inner'>
    {#if hasFormData}
      <Button size='small' style='width: 50px' onClick={clearInput}><SVG icon='bin'/></Button>
    {/if}    
    {#if render}
      <input type='file' {accept} {...props} on:change={onChangeEventHandler} bind:value  />  
    {/if}
  </div>
</div>

<style lang="scss">
  .fileinput-container {        
    width: 100%;

    .inner{
      display: flex;
      gap: 5px;
    }
    
    label{
      font-size: 10px;
      margin-bottom: 2px;
      display: flex;
    }

    input{
      border: none;
      border-bottom: 2px solid transparent;

      &::placeholder{
        color: var(--black-6);
      }
    }

    &.valid{
      label{
        color: var(--black-2)
      }
      input{
        color: var(--black-2);
        border-bottom: 2px solid var(--success-0);
      }
    }

    &.invalid{
      label{
        color: var(--danger-0)
      }
      input{
        color: var(--danger-0);
        border-bottom: 2px solid var(--danger-0);
      }
    }    

    &.dark-theme{
      label{
        color: var(--white-2)
      }
    }

  }
  
</style>
