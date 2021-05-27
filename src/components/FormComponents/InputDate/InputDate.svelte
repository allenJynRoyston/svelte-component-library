<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount, getContext } from 'svelte';
  import { validateDate } from '../../../js'
  import * as dayjs from "dayjs";

  //--------------------------- COMPONENT PROPS
  export let onChange = null
  export let onKeypress = null
  export let updateForm = null;    
  
  export let placeholder = null
  export let value = ''
  export let key = null
  export let label = null; 
  export let minDate = null;
  export let maxDate = null;    
  export let required = null;
  //---------------------------

  //--------------------------- VARS
  let errors = [];
  const props = {
    id:key,
    placeholder,    
  }

  const theme:string = getContext('theme');


  value = !!value ? dayjs.default(value).format('YYYY-MM-DD') : value

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
    const {isValid, validationErrors} = validateDate({value, required, minDate, maxDate})
    errors = validationErrors
    updateForm && updateForm({key, val, isValid, errors})
  }
  //---------------------------


</script>

<div class={`inputdate-container ${theme}-theme`} class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <label for={key} >{label}</label>
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
      height: 30px;
      width: calc(100% - 20px);
      padding: 0 10px;
      border-bottom: 2px solid transparent;
      outline: none;
      &::placeholder{
        color: var(--black-6);
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
