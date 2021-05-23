<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount, onDestroy } from 'svelte';
  import { validate } from '../../../js'

  //--------------------------- COMPONENT PROPS
  export let onChange = null
  export let onKeypress = null
  export let updateForm = null;    

  export let placeholder = null
  export let value = '' 
  export let key = null
  export let label = null; 
  export let regex = null;
  export let required = null; 
  export let minLength = null;  
  export let maxLength = null;
  export let contentEdit = false
  export let hasSubmitted = false  
  //---------------------------

  //--------------------------- VARS
  let errors = [];
  const props = {
    id:key,
    placeholder,    
  }
  let element;

  const autoExpand = (e, el) => {
    var el = el || e.target
    el.style.height = 'inherit'
    el.style.height = `${el.scrollHeight}px`    
    setTimeout(() => { updateParent(value) })
  }



  //--------------------------- ONMOUNT
	onMount(() => {
    updateParent(value)
    element.addEventListener('paste', autoExpand)
    element.addEventListener('input', autoExpand)
    element.addEventListener('keyup', autoExpand)        
    autoExpand(null, element)    
  }); 


  onDestroy(async () => {
    if(element){
      element.removeEventListener('paste',autoExpand)
      element.removeEventListener('input',autoExpand)
      element.removeEventListener('keyup',autoExpand)    
    }
  })  
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

<div class={`root-component input-container`} test-dataid='input-container' class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <label for={key} >{label}</label>
  {/if}
  
  {#if contentEdit}
    <div class='textarea' contenteditable on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:innerHTML={value} bind:this={element}/>  
  {:else}
    <textarea wrap="hard" class='textarea' {...props} on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:value bind:this={element} />
  {/if}

</div>

<style lang="scss" scoped>
  .input-container {
    width: 100%;


    label{
      font-size: 10px;
      margin-bottom: 2px;
      display: flex;
    }

    .textarea{
      height: 30px;
      width: 100%;
      max-width: calc(100% - 20px);
      padding: 10px;      
      min-height: 50px;
      outline: none;
      border: none;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
      background: var(--white-0);
    }

    &.valid{
      label{
        color: var(--black-2)
      }
      .textarea{
        color: var(--black-0);
        border-bottom: 2px solid transparent;
      }
    }

    &.invalid{
      label{
        color: var(--danger-0)
      }
      .textarea{
        color: var(--danger-0);
        border-bottom: 2px solid var(--danger-0);
      }
    }    

    &.dark-theme{
      .textarea{    
        background: var(--black-5);
      }

      &.valid{
        label{
          color: var(--white-2)
        }
        .textarea{
          background: var(--black-5);          
          color: var(--black-2-text)
        }
      }
    } 

  }
</style>
