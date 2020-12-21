<script lang='ts'>
  //--------------------------- IMPORTS
  import { onMount } from 'svelte';  
  import {Button, Input, InputDate, Textarea, FormErrors, FormPreview, InputTime, InputCheckbox, Select, SelectMulti, Rating} from '../index'
  //---------------------------

  //--------------------------- VARS
  const completedFormData = {}
  let isReady = false
  let layoutSize = 'desktop'
  //---------------------------

  //--------------------------- PROPS
  /**
   * label
  */
  export let formData = []
  /**
   * onSubmit event
  */
  export let onSubmit = null;  
  /**         
  */
  export let padding = 10
  /**         
  */  
  export let breakpoints = {
    mobile: 480,
    tablet: 800,
    desktop: 1920,
    wide: 2440
  }
  //---------------------------

  //--------------------------- ONMOUNT
	onMount(async () => {
    // TODO: might refactor this as some sort of wrapper later

    // get breakpoint events
    window.matchMedia(`screen and (min-width: 0px) and (max-width: ${breakpoints.mobile}px)`).onchange = () => {
      layoutSize = 'mobile'
    };      
    window.matchMedia(`screen and (min-width: ${breakpoints.mobile + 100}px) and (max-width: ${breakpoints.tablet}px)`).onchange = () => {
      layoutSize = 'tablet'
    };     
    window.matchMedia(`screen and (min-width: ${breakpoints.tablet + 100}px) and (max-width: ${breakpoints.desktop}px)`).onchange = () => {
      layoutSize = 'desktop'
    };           
    window.matchMedia(`screen and (min-width: ${breakpoints.wide + 100}px)`).onchange = () => {
      layoutSize = 'wide'
    };    

    // determine current breakpoint
    if(window.innerWidth >= 0 && window.innerWidth < breakpoints.mobile){
      layoutSize = 'mobile'
    }
    if(window.innerWidth >= breakpoints.mobile && window.innerWidth < breakpoints.tablet){
      layoutSize = 'tablet'
    }
    if(window.innerWidth >= breakpoints.tablet && window.innerWidth < breakpoints.desktop){
      layoutSize = 'desktop'
    }
    if(window.innerWidth >= breakpoints.wide){
      layoutSize = 'wide'
    }    
    

    formData.map(x => {
      const {key, value = null} = x
      if(key){
        completedFormData[key] = {
          value,
          isValid: true,
          errors: []
        }
      }
    })   
    isReady = true; 
  }); 
  //--------------------------- 

  //--------------------------- FUNCTIONS
  const onSubmitHandler = () => {
    let data = Object.entries(completedFormData).map(x => {return {key: x[0], value: x[1].value}})
    onSubmit && onSubmit(data)
  }

  const updateForm = ({key, val, isValid, errors}) => {
    completedFormData[key].value = val
    completedFormData[key].isValid = isValid    
    completedFormData[key].errors = errors    
  }

  const stripUnusedProperties = (data) => {
    let clone = Object.assign({}, data)
    const {renderAs} = clone;

    switch(renderAs){
      case 'textarea':
        delete clone['type']
      break;
    }

    delete clone['sizing']
    delete clone['renderAs']

    return clone
  }

  let desktopColunnSize = 0, mobileColumnSize = 0, eleCount = 0;
  const applyStyles = (sizing = {desktop: 100, mobile: 100}, layout) => {   
    let style

    let desktopWidth = sizing.desktop || 100
    let mobileWidth = sizing.mobile || 100
    
    if(layout === 'desktop'){
      if(desktopColunnSize + (desktopWidth) < 100){
        desktopColunnSize += desktopWidth      
        eleCount ++
        style = `width: calc(${desktopWidth}% - ${padding * 2}px); margin-right: ${padding}px`
      }
      else{
        style = `width: calc(${desktopWidth}% + ${padding * eleCount}px)`
        desktopColunnSize = 0
        eleCount = 0
      }
    }

    if(layout === 'mobile'){
      if(mobileColumnSize + (mobileWidth) < 100){
        mobileColumnSize += mobileWidth      
        eleCount ++
        style = `width: calc(${mobileWidth}% - ${padding * 2}px); margin-right: ${padding}px`
      }
      else{
        style = `width: calc(${mobileWidth}% + ${padding * eleCount}px)`
        mobileColumnSize = 0
        eleCount = 0
      }      
    }    

    return style
  }
  //---------------------------  
  
  
  //--------------------------- $
  $: disabled = Object.entries(completedFormData).filter(x => {return !x[1].isValid}).length > 0

  $: getErrorData = Object.entries(completedFormData).filter(x => {return {...x[1]}})  
  //---------------------------
</script>

{#if isReady}
<p>{layoutSize}</p>

  <form class='form-container' data-testid='form-container' style={`padding: 20px ${padding}px;`}>
    {#if formData.length > 0}
      {#each formData as data, i}

        <div style={layoutSize === 'mobile' ? applyStyles(data.sizing, 'mobile') : applyStyles(data.sizing, 'desktop') } >
          {#if data.renderAs === 'input'}
            <Input {...stripUnusedProperties(data)} updateForm={updateForm} />
          {/if}
          {#if data.renderAs === 'textarea'}
            <Textarea {...stripUnusedProperties(data)} updateForm={updateForm} />
          {/if}      
          {#if data.renderAs === 'date'}
            <InputDate {...stripUnusedProperties(data)} updateForm={updateForm} />
          {/if}    
          {#if data.renderAs === 'time'}
            <InputTime {...stripUnusedProperties(data)} updateForm={updateForm} />
          {/if}       
          {#if data.renderAs === 'checkbox'}
            <InputCheckbox {...stripUnusedProperties(data)} updateForm={updateForm} />
          {/if}   
          {#if data.renderAs === 'select'}
            <Select {...stripUnusedProperties(data)} updateForm={updateForm} />
          {/if}   
          {#if data.renderAs === 'selectmulti'}
            <SelectMulti {...stripUnusedProperties(data)} updateForm={updateForm} />
          {/if}   
          {#if data.renderAs === 'rating'}
            <Rating {...stripUnusedProperties(data)} updateForm={updateForm} />
          {/if}
        </div>                                                            
      {/each}

      
      <div style='width: 100%'>
        <div class='preview-container'>
          <FormPreview data={completedFormData} />
        </div>

        <div class='error-container'>
          <FormErrors errors={getErrorData} />
        </div>


        <div class='button-container'>
          <Button onClick={onSubmitHandler} {disabled}>
            <slot>
              Save
            </slot>
          </Button>
        </div>
      </div>
    {:else}
      <p>No form data</p>
    {/if}
  </form>
{:else}
  <div />
{/if}


<style lang="scss" scoped>
  .form-container {    
    border: 1px solid black;
    border-radius: 5px;   
    display: flex;
    flex-wrap: wrap;

    .preview-container, .error-container, .button-container{
      margin: 10px 0;
    }

  }
</style>



<!-- EXAMPLE USAGE: 
  <script>
    import {Form} from '../index'

    let formData = [
      {
        renderAs: 'input',      
        label: 'Username',
        placeholder: 'example: john smith',
        key: 'username',
        value: 'allen.royston', 
        regex: /^[a-zA-Z.]+$/,      
        minLength: 3,
        maxLength: 25,
        required: true
      },
      {
        renderAs: 'input', 
        type: 'password', 
        label: 'Password',
        key: 'password',
        value: 'notapassword',
        allowShowToggle: true,
        required: true
      }                           
    ]

    const onSubmit = (e) => {
      console.log(e)
    }

  </script>
  

  <Form {formData} {onSubmit} />
  
  
  <Form {formData} {onSubmit} >  
    Submit
  </Form  
-->
