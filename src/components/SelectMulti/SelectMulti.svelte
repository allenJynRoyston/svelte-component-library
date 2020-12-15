<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount } from 'svelte';
  import { validateSelectMulti } from '../../js'

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

  let _options = options.map(x => {
    return {...x, _selected: false}
  })


  _options = onInitFilter ? onInitFilter(value, _options) : []
  let errors = [];
  const props = {
    id:key,
    placeholder,    
  }

  //--------------------------- ONMOUNT
	onMount(() => {
    updateParent()
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS
  const onClick = (index) => {   
    _options[index]._selected = !_options[index]._selected
    updateParent()
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
    
    updateForm && updateForm({key, val: isSelected, isValid, errors})
  }
  //---------------------------
</script>

<div class='selectmulti-container' data-testid='selectmulti-container' class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <label for={key} >{label}</label>
  {/if}

  <ul class='selectmulti-options'>
    {#each _options as option, i}        
      <li class='selectmulti-option' data-testid={`option-${i}`} on:click={() => {onClick(i)}} >
        <span class='cb' >
          {option._selected ? 'X' : '-'}
        </span>
        <span class='text'>{option.title}</span>
      </li>  
    {/each}
  </ul>

</div>

<style lang="scss">
  .selectmulti-container {    
    margin-bottom: 10px;
    width: 100%;
    
    label{
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
      font-size: 14px;
      cursor: pointer;
      display: flex;
      &:hover{
        color: blue
      }        

      .cb{
        padding-right: 10px;
      } 
    }

    &.valid{
      label{
        color: black
      }
    }

    &.invalid{
      label{
        color: red
      }
    }

  }
  
</style>
