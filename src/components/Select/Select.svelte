<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount } from 'svelte';
  import { validateSelect } from '../../js'

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
  export let value = null
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
  export let defaultOption = null;  
  /**
   * 
  */  
  export let required = null;
  /**
   * 
  */  
  export let options = []
  /**
   * 
  */    
  export let onInitFilter = null;
  /**
   * 
  */  
  export let onChangeFilter = null  
  //---------------------------

  //--------------------------- VARS
  let selected = onInitFilter ? onInitFilter(value, options) : null
  let errors = [];
  const props = {
    id:key,
    placeholder,    
  }

  //--------------------------- ONMOUNT
	onMount(() => {
    updateParent(selected)
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS
  const onChangeEventHandler = () => {   
    onChange && onChange(selected)
    updateParent(selected)
  }

  const onKeypressHandler = (e) => {
    setTimeout(() => {
      onKeypress && onKeypress(selected)
      updateParent(selected)
    })
  }
  //---------------------------

  //--------------------------- FUNCTIONS
  const updateParent = (val) => {            
    const {isValid, validationErrors} = validateSelect({value: val, required})
    errors = validationErrors

    if(onChangeFilter){
      val = onChangeFilter(JSON.parse(JSON.stringify(val)))
    }
    console.log(val)

    updateForm && updateForm({key, val, isValid, errors})
  }
  //---------------------------
</script>

<div class='select-container' data-testid='select-container' class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <label for={key} >{label}</label>
  {/if}

  <!-- svelte-ignore a11y-no-onchange -->
  <select data-testid='select' bind:value={selected} on:change={onChangeEventHandler} on:keydown={onKeypressHandler}>
    {#if defaultOption}
      <option disabled selected value>{defaultOption}</option>
    {/if}
    {#each options as option, i}
      <option data-testid={`option-${i}`} value={option}>{option.title}</option>
    {/each}
  </select>
</div>

<style lang="scss">
  .select-container {    
    margin-bottom: 10px;
    width: 100%;
    
    label{
      font-size: 10px;
      margin-bottom: 2px;
      display: flex;
    }

    select{      
      width: 100%;      
      padding-left: 10px;
    }

    &.valid{
      label{
        color: black
      }
      select{
        color: black;
        border: 1px solid black;
      }
    }

    &.invalid{
      label{
        color: red
      }
      select{
        color: black;
        border: 1px solid red;
      }
    }

  }
  
</style>
