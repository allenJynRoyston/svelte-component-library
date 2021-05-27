<script lang='ts'>  
  //--------------------------- IMPORTS  
  import { onMount, tick, getContext } from 'svelte';  

  import SVG from '@components/SVG/SVG.svelte'
  import Button from '@components/Button/Button.svelte'
  import { validateInputFile } from '../../../js'

  //--------------------------- COMPONENT PROPS
  export let onChange = null
  export let updateForm = null;    

  export let type = null  
  export let placeholder = null
  export let value = ''
  export let key = null
  export let label = null;
  export let required = null;
  export let accept = null

  //---------------------------

  //--------------------------- VARS
  let errors = [];
  const props = {
    id:key,
    placeholder,    
  }
  let render = true;
  let hasFormData = false

	let w;
	let h;  
  let val = null;

  const colors:any = getContext('colors')
  const theme:string = getContext('theme')

  //--------------------------- ONMOUNT
	onMount(() => {
    updateParent(null)
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS
  const onChangeEventHandler = (e) => {       
    hasFormData = true
    let formData = new FormData();    
    formData.append(`file`, e.target.value)
    onChange && onChange(formData)
    val = e.target.value
    updateParent(formData)
  }

  const clearInput = async() => {
    // render = false;
    // await tick();
    // render = true;
    hasFormData = false;
    val = null;
    updateParent(null)
  }
  //---------------------------

  //--------------------------- FUNCTIONS
  const updateParent = (formData) => {       
    const {isValid, validationErrors} = validateInputFile({formData, required})
    errors = validationErrors
    updateForm && updateForm({key, val: formData, isValid, errors})
  }
  //---------------------------


</script>

<div class={`fileinput-container ${theme}-theme`} data-testid='fileinput-container' class:invalid={errors.length > 0} class:valid={errors.length === 0}>
  {#if label}
    <label>{label}</label>
  {/if}
  
  <div class='inner'> 
      <div class='masked-btn' bind:clientWidth={w} bind:clientHeight={h}>

          <span class:hide={val !== null} class:show={val === null}>
            <Button size='small' type='white' hollow >Select File...</Button> 
            <input type='file' id="file-upload" style={`width: ${w}px; height: ${h}px`} {accept} {...props} on:change={onChangeEventHandler} bind:value  />  
          </span>

          <span class:hide={val === null} class:show={val !== null}>
            <Button size='small' type='danger' onClick={clearInput}><SVG icon='bin' fill={colors.danger[0].textFriendlyColor} size={10} /></Button>                   
            <Button size='small' type='white' hollow >{val}</Button>             
          </span>
       
      </div>
      
  </div>
</div>

<style lang="scss">
  .fileinput-container {        
    width: 100%;

    .inner{
      display: flex;
      gap: 5px;
    }

    span{
      display: flex;
    }

    .show{
      pointer-events: all;
      opacity: 1;
      width: auto;
      height: auto;
    }

    .hide{
      pointer-events: none;
      opacity: 0;
      width: 0;
      height: 0;
    }
    

    label{
      text-transform: uppercase;
      font-size: 10px;
      margin-bottom: 2px;
      display: flex;
    }

    .masked-btn{
      position: relative;
      display: flex;
      cursor: pointer;
    }

    input[type="file"] {
      position: absolute;
      top: 0;
      opacity: 0;
      cursor: pointer;
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
      label{
        color: var(--white-2)
      }
    }

  }
  
</style>
