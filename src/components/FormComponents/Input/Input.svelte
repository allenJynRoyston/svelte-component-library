<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount, getContext } from 'svelte';
  import { validate } from '../../../js'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import Button from '@components/Button/Button.svelte'

  //--------------------------- COMPONENT PROPS
  export let onChange = null
  export let onKeypress = null
  export let updateForm = null;    

  export let type = null  
  export let placeholder = null
  export let value = ''
  export let noBottomMargin = false
  export let key = null
  export let label = null;
  export let regex = null;
  export let required = null;
  export let allowShowToggle = true;  
  export let minLength = null;
  export let maxLength = null;
  export let hasSubmitted = false;
  //---------------------------

  //--------------------------- VARS
  let errors = [];
  const props = {
    id:key,
    placeholder,    
  }

  let showPassword = false

  const theme:string = getContext('theme');

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

<div class={`input-container ${theme}-theme`} data-testid='input-container' class:no-bottom-margin={noBottomMargin} class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <TwoSlot showLeft showRight>
      <label for={key} >{label}</label>

      <div slot='right'>
        {#if allowShowToggle && type === 'password'}
          <Button exactfit size='tiny' onClick={() => {showPassword = !showPassword}} >{showPassword ? 'Hide' : 'Show'}</Button>  
        {:else}
          <Button style='opacity: 0' exactfit size='tiny'></Button>  
        {/if}     

      </div>
    </TwoSlot>
  {/if}
  
  {#if type === 'password'}
    {#if showPassword}
      <input type='text' {...props} on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:value  />  
    {:else}
      <input type='password' {...props} on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:value  />  
    {/if}


    {:else if type === 'number'}
      <input type='number' {...props} on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:value  />
    {:else}
      <input type='text' {...props} on:change={onChangeEventHandler} on:keydown={onKeypressHandler} bind:value  />
    {/if}
</div>

<style lang="scss">
  .input-container {        
    width: 100%;

    &.no-bottom-margin{
      margin-bottom: 0px;
    }


    label{
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
      &.valid{
        label{
          color: var(--white-2)
        }
        input{
          color: var(--white-2)
        }
    }

      input{
        background: var(--black-5);
        &::placeholder{
          color: var(--black-6);
        }
      }
    }    


  }
  
</style>
