<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount } from 'svelte';
  import { validateRating } from '../../../js'

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
  export let value = 0
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
  /**
   * 
  */  
  export let maxLength = 5;  
  /**
   * 
  */  
  export let slots = null
  /**
   * 
  */  
  export let fixedWidth = 'auto';
  //---------------------------

  //--------------------------- VARS
  let errors = [];
  const props = {
    id:key,
    placeholder,    
  }

  let ratings = [];
  for(let i = 1; i <= maxLength; i++){
    ratings.push({selected: i <= value, i})
  }

  const inSlots = {
    selected: slots?.selected || '⭐',
    notSelected: slots?.notSelected || '☆',
  }  
  //--------------------------- ONMOUNT
	onMount(() => {
    updateParent()
  }); 
  //---------------------------   

  //--------------------------- FUNCTIONS
  const updateParent = () => {        
    const {isValid, val, validationErrors} = validateRating({ratings, required})
    errors = validationErrors
    updateForm && updateForm({key, val, isValid, errors})
  }

  const toggle = (index) => {
    let filtered = ratings.filter(x => x.selected === true) || null
    let lastEle = filtered && filtered[filtered.length - 1] || null           
    let unSelect = lastEle && lastEle.i - 1 === index
  
    ratings = ratings.map((x, i) => {
      x.selected = unSelect ? false : i <= index
      return x
    })    
    updateParent()
  }
  //---------------------------

</script>

<div class='rating-container' data-testid='rating-container' class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <label for={key} >{label}</label>
  {/if}
  
  <div class='rating-icons'>
    {#each ratings as {selected, i}, index}    
      <button role='button' 
        style={`width: ${!!fixedWidth ? fixedWidth : '100%'}`}             
        data-testid={`rating-btn-${i}`}
        on:click|preventDefault={() => {toggle(index)}} >
          {@html selected ? inSlots.selected : inSlots.notSelected }
      </button>
    {/each}
  </div>
</div>

<style lang="scss">
  .rating-container {    
    margin-bottom: 10px;
    width: 100%;    

    .rating-icons{
      display: flex;
      flex-wrap: nowrap;
    }
    
    label{
      font-size: 10px;
      margin-bottom: 2px;
      display: flex;
    }

    button{
      border: none;      
      cursor: pointer;
      background: none;
      outline: none;
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
