<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount, getContext } from 'svelte';
  import { validateSelectMulti } from '@js'

  //--------------------------- COMPONENT PROPS
  export let value = null
  export let key = null
  export let label = null; 
  export let defaultOption = null;   
  export let required = null;
  export let options = []   
  
  export let updateForm = null;       
  export let onInitFilter = null;
  export let onChangeFilter = null  
  export let onChange = null
  export let onClick = null  
  //---------------------------

  //--------------------------- VARS

  let _options = options.map(x => {
    return {...x, _selected: false}
  }) || []


  _options = onInitFilter ? onInitFilter(value, _options) : _options 
  let errors = [];
  
  const theme:string = getContext('theme');

  //--------------------------- ONMOUNT
	onMount(() => {
    updateParent()
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS
  const onButtonClick = (index) => {   
    _options[index]._selected = !_options[index]._selected
    updateParent()
    onClick && onClick();
  }
  //---------------------------

  //--------------------------- FUNCTIONS
  const updateParent = () => {            
    let isSelected = JSON.parse(JSON.stringify(_options)).filter((x) => x._selected === true)

    if(onChangeFilter){
      isSelected = onChangeFilter(isSelected)
    }

    const {isValid, validationErrors} = validateSelectMulti({value: isSelected, required})
    errors = validationErrors

    isSelected = isSelected.map(x => {
      delete x._selected
      return x 
    })
    
    onChange && onChange()
    updateForm && updateForm({key, val: isSelected, isValid, errors})
  }
  //---------------------------

  $: props = {
    id:key,
  }

</script>

<div class={`selectmulti-container ${theme}-theme`} data-testid='selectmulti-container' class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <label for={key} >{label}</label>
  {/if}

  <ul class='selectmulti-options'>
    {#each _options as option, i}        
      <li class='selectmulti-option' on:click={() => {onButtonClick(i)}} >
        <input data-testid={`selectmulti-option-${i}`} type='checkbox' checked={option._selected}>
        <span class='text'>{option.title}</span>        
      </li>  
    {/each}
  </ul>

</div>

<style lang="scss">
  .selectmulti-container {    
    width: 100%;
    
    label{
      text-transform: uppercase;
      font-size: 10px;
      margin-bottom: 2px;
      display: flex;
    }

    .selectmulti-options{     
      display: flex;
      flex-direction: column;
      width: 100%;       
      list-style-type: none;
      padding: 0;   
      margin: 0;     
    }

    .selectmulti-option{
      padding: 2px 0;
      font-size: 12px;
      cursor: pointer;
      display: flex;
      color: var(--black-2);

      input{
        cursor: pointer;
      }

      &:hover{
        color: var(--primary-0)
      }        

      .cb{
        padding-right: 10px;
      } 
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
      .selectmulti-option{
        color: var(--white-2);
      }

      &.valid{
        label{
          color: var(--white-2)
        }
      }  
    }

  }  
</style>
