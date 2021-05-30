<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount, getContext } from 'svelte';
  import { validateSelect } from '@js'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import Button from '@components/Button/Button.svelte'

  //--------------------------- COMPONENT PROPS
  export let onChange = null
  export let onKeypress = null 
  export let updateForm = null;    
  export let placeholder = null
  export let value = null
  export let key = null
  export let label = null;
  export let defaultOption = null;   
  export let required = null;
  export let options = []  
  export let onInitFilter = null;
  export let onChangeFilter = null  
  export let exactfit = false;  
  //---------------------------

  //--------------------------- VARS
  let selected = null;
  let errors = [];

  const theme:string = getContext('theme');
  
  //--------------------------- ONMOUNT
	onMount(() => {
    updateParent(selected)
    getSelected();
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS
  const getSelected = () => {
    selected = onInitFilter ? onInitFilter(value, options) : null;
  }

  const onChangeEventHandler = () => {   
    onChange && onChange(selected)
    updateParent(selected)
  }

  const onKeypressHandler = () => {
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

    updateForm && updateForm({key, val, isValid, errors})
  }
  //---------------------------

  $: {
    value && getSelected()
  }
</script>

<div class={`select-container ${theme}-theme`} data-testid='select-container' class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <TwoSlot nopadding>
      <label slot='left' for={key} style='transform: translateY(4px);' >{label}</label>

      <div slot='right'>
        <Button style='opacity: 0' exactfit size='tiny'></Button>  
      </div>

    </TwoSlot>
  {/if}

  <!-- svelte-ignore a11y-no-onchange -->
  <select data-testid='select' class:exactfit={exactfit} bind:value={selected} on:change={onChangeEventHandler} on:keydown={onKeypressHandler}>
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
      text-transform: uppercase;
      font-size: 10px;
      margin-bottom: 2px;
      display: flex;
    }

    select{      
      height: 30px;
      width: 100%;      
      padding-left: 10px;
      padding: 0 10px;
      border: none;
      border-bottom: 2px solid transparent;
      outline: none;
      cursor: pointer;
      
      &.exactfit{
        width: auto;
      }

      &::placeholder{
        color: var(--black-6-text);
      }
    }

    option{
      border: none;
      outline: none;
    }

    option:disabled {
      color: var(--black-6-text);
    }


    &.valid{
      label{
        color: var(--black-2)
      }
      select{
        background: var(--white-0);
        color: var(--black-2)
      }
    }

    &.invalid{
      label{
        color: var(--danger-0)
      }
      select{
        color: var(--danger-0);
        border-bottom: 2px solid var(--danger-0);
      }
    }    

    &.dark-theme{
      option:disabled {
        color: var(--white-8);
      }      

      select{
        background: var(--black-5);
      }
            
      &.valid{
        label{
          color: var(--white-2)
        }
        select{
          color: var(--white-2)
        }
      }
    } 

  }
  
</style>
