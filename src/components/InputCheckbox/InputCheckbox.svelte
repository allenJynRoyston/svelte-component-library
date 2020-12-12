<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount } from 'svelte';
  import { validateCheckbox } from '../../js'

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
  export let value = false
  /**
   * 
  */ 
  export let text = null;
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
    setTimeout(() => {
      onChange && onChange(value)
      updateParent(value)
    })
  }
  //---------------------------

  //--------------------------- FUNCTIONS
  const toggle = () => {
    value = !value
    setTimeout(() => {
      onChange && onChange(value)
      updateParent(value)
    })
  }

  const updateParent = (val) => {        
    const {isValid, validationErrors} = validateCheckbox({value, required})
    errors = validationErrors
    updateForm && updateForm({key, val, isValid, errors})
  }
  //---------------------------


</script>

<div class='inputcheckbox-container' class:hasLabel={label} class:invalid={errors.length > 0} class:valid={errors.length === 0}>

  {#if label}
    <label for={key} >{label}</label>
  {/if}  

  <div class='cb-container'  on:click={toggle}>
    <input type='checkbox' {...props} on:change={onChangeEventHandler} bind:checked={value} />  
    <span class='cb-text'>{text}</span>
  </div>

</div>

<style lang="scss">
  .inputcheckbox-container {        
    width: 100%;
    
    label{
      font-size: 10px;
      margin-bottom: 2px;
      display: flex;
    }

    .cb-container{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 12px;
      cursor: pointer;
      input{        
        margin-left: 0px;
        margin-right: 5px;
        padding: 0 0;
        cursor: pointer;
      }
    }   

    &.hasLabel{
      margin-bottom: 10px;
    }
        

    &.valid{
      .cb-text{
        color: black;
      }
    }

    &.invalid{
      .cb-text{
        color: red;
      }
    }
  }  
</style>
