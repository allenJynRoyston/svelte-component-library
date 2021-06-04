<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount, getContext } from 'svelte';
  import { validateDate } from '@js'
  import * as dayjs from "dayjs";

  import TwoSlot from '@base/TwoSlot.svelte'
  import Button from '@base/Button.svelte'


  //--------------------------- COMPONENT PROPS
  export let onChange = null
  export let onKeypress = null
  export let updateForm = null;    
  
  export let value = null
  export let key = null
  export let label = null; 
  export let minDate = null;
  export let maxDate = null;    
  export let required = null;
  //---------------------------

  //--------------------------- VARS
  let errors = [];

  const theme:string = getContext('theme');


  //--------------------------- ONMOUNT
	onMount(() => {
    updateParent(value)
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS
  const onChangeEventHandler = () => {   
    onChange && onChange(value, key)
    updateParent(value)
  }

  const onKeypressHandler = () => {
    setTimeout(() => {
      onKeypress && onKeypress(value)
      onChange && onChange(value, key)
      updateParent(value)
    })
  }
  //---------------------------

  //--------------------------- FUNCTIONS
  const updateParent = (val) => {        
    const {isValid, validationErrors} = validateDate({value, required, minDate, maxDate})
    errors = validationErrors
    updateForm && updateForm({key, val, isValid, errors})
  }
  //---------------------------

  $: props = {
    id:key,    
  }

  $: value = !!value ? dayjs.default(value).format('YYYY-MM-DD') : value  

  $: {
    value && onKeypressHandler();
    maxDate && onKeypressHandler();
    minDate && onKeypressHandler();
  }

</script>

<div class={`inputdate-container ${theme}-theme`} class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <TwoSlot nopadding>
      <label slot='left' for={key} style='transform: translateY(4px);' >{label}</label>

      <div slot='right'>
        <Button style='max-width: 1px; padding: 0; margin: 0; opacity: 0; pointer-events: none;' exactfit size='tiny'>|</Button>  
      </div>
    </TwoSlot>
  {/if}
  
  <input type='date' {...props} on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:value  />  

</div>

<style lang="scss">
  .inputdate-container {    
    width: 100%;
    
    label{
      text-transform: uppercase;
      font-size: 10px;
      margin-bottom: 2px;
      display: flex;
    }

    input{
      height: calc(30px - 2px);
      width: calc(100% - 20px);
      padding: 0 10px;
      border-bottom: 2px solid transparent;
      outline: none;
      &::placeholder{
        color: var(--black-8);
      }
    }


    &.valid{
      label{
        color: var(--black-2)
      }
      input{
        background: var(--white-0);
        color: var(--black-2)
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
      input{
        background: var(--black-5);
        &::placeholder{
          color: var(--black-6);
        }
        &::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }             
      }
            
      &.valid{
        label{
          color: var(--white-2)
        }
        input{
          color: var(--white-2)
        }
      }
    }   
  }  
</style>
