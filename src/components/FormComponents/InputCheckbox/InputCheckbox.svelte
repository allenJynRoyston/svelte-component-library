<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount, getContext } from 'svelte';
  import { validateCheckbox } from '@js'

  //--------------------------- COMPONENT PROPS
  export let onChange = null
  export let onKeypress = null
  export let updateForm = null;     
  export let checked = false
  export let text = null;  
  export let key = null
  export let label = null; 
  export let required = null;
  //---------------------------

  //--------------------------- VARS
  let errors = [];
  $: props = {
    checked,
    id:key,    
  }

  const theme:string = getContext('theme');



  //--------------------------- ONMOUNT
	onMount(() => {
    onChange && onChange(checked, key)
    updateParent(checked)
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS
  const onChangeEventHandler = () => {   
    setTimeout(() => {
      onKeypress && onKeypress(checked)
      onChange && onChange(checked)
      updateParent(checked)
    })
  }
  //---------------------------

  //--------------------------- FUNCTIONS
  const toggle = () => {
    checked = !checked
    setTimeout(() => {
      onChange && onChange(checked)
      updateParent(checked)
    })
  }

  const updateParent = (val) => {        
    const {isValid, validationErrors} = validateCheckbox({value: checked, required})
    errors = validationErrors
    updateForm && updateForm({key, val, isValid, errors})
  }
  //---------------------------


</script>

<div class={`inputcheckbox-container ${theme}-theme`} class:hasLabel={label} class:invalid={errors.length > 0} class:valid={errors.length === 0}>

  {#if label}
    <label for={key} >{label}</label>
  {/if}  

  <div class='cb-container'  on:click={toggle}>
    <input type='checkbox' {...props} on:change={onChangeEventHandler} bind:checked={checked} />  
    <span class='cb-text'>{text}</span>
  </div>

</div>

<style lang="scss">
  .inputcheckbox-container {        
    width: 100%;
    
    label{
      text-transform: uppercase;
      font-size: 10px;
      margin-bottom: 2px;
      display: flex;
    }

    .cb-container{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 12px;
      width: auto;
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
      label{
        color: var(--black-2)
      }
    }

    &.invalid{
      label{
        color: var(--danger-0)
      }
    }    

    &.dark-theme{
      &.valid{
        label{
          color: var(--white-2)
        }
      }
    }    


  }  
</style>
