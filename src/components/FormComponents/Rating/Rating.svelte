<script lang='ts'>  
  //--------------------------- IMPORTS 
  import { getContext, onMount }  from 'svelte'
  import { validateRating } from '@js'
  import SVG from '@components/SVG/SVG.svelte'

  //--------------------------- COMPONENT PROPS
  export let onChange = null
  export let updateForm = null;    

  export let applyTheme = null;    
  export let value = 0
  export let key = null
  export let label = null;
  export let required = null;
  export let maxLength = 5;  
  export let emptyIcon = null 
  export let fullIcon = null;

  const colors:any = getContext('colors')
  const theme:string = getContext('theme');
  //---------------------------

  //--------------------------- VARS
  let errors = [];
  
  let ratings = [];


  $: fill = () => {
    return !!applyTheme ? colors[applyTheme][0].color : null
  }

  //--------------------------- ONMOUNT
	onMount(() => {
    updateParent()
    buildArr()
  }); 
  //---------------------------   

  //--------------------------- FUNCTIONS
  const buildArr = () => {
    let _ratings = []
    for(let i = 1; i <= maxLength; i++){
      _ratings.push({selected: i <= value, i})
    }

    ratings = _ratings
    toggle(value);
  }

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

    setTimeout(() =>{          
      onChange && onChange(index, 'value')
    })

    updateParent()
  }
  //---------------------------


  $: inSlots = {    
    selected: emptyIcon || 'star-full',
    notSelected: fullIcon || 'star-empty'
  }    

  $: {
    value && toggle(value)
    maxLength && buildArr()
  }

</script>

<div class={`rating-container ${theme}-theme`} data-testid='rating-container' class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <label>{label}</label>
  {/if}
  
  <div class={`rating-icons`}>
    {#each ratings as {selected, i}, index}    
      <button 
        id={`rating-btn-${i}`}
        role='button'        
        data-testid={`rating-btn-${i}`}
        on:click|preventDefault={() => {toggle(index)}} >
          <SVG fill={selected ? fill() : null} icon={selected ? inSlots.selected : inSlots.notSelected}/>          
      </button>
    {/each}
  </div>
</div>

<style lang="scss">
  .rating-container {    
    width: 100%;    

    .rating-icons{
      display: flex;
      flex-wrap: nowrap;
    }
    
    label{
      text-transform: uppercase;
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
