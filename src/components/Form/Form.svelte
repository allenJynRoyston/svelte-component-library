<script lang='ts'>
  //--------------------------- IMPORTS
  import { onMount, onDestroy, getContext } from 'svelte';  
  import { DeviceStore } from '@store/store'

  import Button from '@components/Button/Button.svelte'
  import Input from '@components/FormComponents/Input/Input.svelte'
  import InputDate from '@components/FormComponents/InputDate/InputDate.svelte'
  import Textarea from '@components/FormComponents/Textarea/Textarea.svelte'
  import FileInput from '@components/FormComponents/FileInput/FileInput.svelte'
  import SVG from '@components/SVG/SVG.svelte'
  import InputTime from '@components/FormComponents/InputTime/InputTime.svelte'
  import Select from '@components/FormComponents/Select/Select.svelte'
  import SelectMulti from '@components/FormComponents/SelectMulti/SelectMulti.svelte'
  import Rating from '@components/FormComponents/Rating/Rating.svelte'
  import InputCheckbox from '@components/FormComponents/InputCheckbox/InputCheckbox.svelte'
  import Container from '@components/Container/Container.svelte'

  import FormErrors from './FormErrors/FormErrors.svelte'
  import FormPreview from './FormPreview/FormPreview.svelte'
  //---------------------------

  //--------------------------- VARS
  let completedFormData = {}  
  let layoutSize = 'desktop'
  let onBeforeUnload;
    
  let isReady = false  
  let hasError = false 
  let hasSubmitted = false

  const theme:string = getContext('theme')
  const colors:any = getContext('colors')
  const {appWidth, isMobile, isTabletAndBelow, isTablet, isDesktop} = DeviceStore;
  //---------------------------

  //--------------------------- PROPS
  export let formData = []
  export let onSubmit = null;  
  export let padding = 10
  export let breakpoints = {
    mobile: 480,
    tablet: 800,
    desktop: 1080,
    wide: 1440
  }
  export let localStorageKey = null;    
  export let clearLocalStorage = false;     
  export let idModifier = null;       
  export let isBusy = false
  export let showPreview = false
  export let style = null
  export let showButton = false
  //---------------------------

  //--------------------------- ONMOUNT/ONDESTROY
  onDestroy(() => {
    window.removeEventListener("beforeunload", onBeforeUnload, true);  
  })

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
    
    // map formData
    formData = await formData.map(x => {
      const {value = null} = x
      if(x.key){        
        completedFormData[!!idModifier ? `${x.key}_${idModifier}` : x.key] = {
          value,
          isValid: true,
          errors: []
        }        
      }
       x.key = !!idModifier ? `${x.key}_${idModifier}` : x.key

      return x;
    })   


    // check if localStorage key exists
    initStorageKey()
    
    isReady = true; 
  }); 
  //--------------------------- 

  const initStorageKey = () => {
    try{
      if(!!localStorageKey && localStorageKey.length > 0){
        // set onBeforeUnload to capture formData
        onBeforeUnload = window.addEventListener('beforeunload', (e) => {
          if(!hasError && !hasSubmitted && !!localStorageKey && localStorageKey.length > 0){
            window.localStorage.setItem(localStorageKey, JSON.stringify(completedFormData));
          }
        }); 

        // check if data already exists
        let savedData = window.localStorage.getItem(localStorageKey) || null;
        if(!!savedData){                      
          completedFormData = JSON.parse(savedData)                              
          
          for (const [key, pair] of Object.entries(completedFormData)) {      
            /* @ts-ignore */             
            formData.find(x => x.key === key).value = pair.value
          }
        }

        if(clearLocalStorage){
          window.localStorage.removeItem(localStorageKey);
        }         
      }
    }
    catch(e){
      window.localStorage.removeItem(localStorageKey);      
      hasError = true
      location.reload()
    }  
    
   
  }

  //--------------------------- FUNCTIONS
  const onSubmitHandler = () => {
    let data = Object.entries(completedFormData).map(x => {
      return !!idModifier ? 
        // @ts-ignore
        {key: x[0].split(`_${idModifier}`)[0], value: x[1].value} : 
        // @ts-ignore
        {key: x[0], value: x[1].value}
    })
    onSubmit && onSubmit(data)

    hasSubmitted = true
    if(!!localStorageKey){
      window.localStorage.removeItem(localStorageKey);
    }

  }

  const updateForm = ({key, val, isValid, errors}) => {        
    if(!hasError){
      completedFormData[key].value = val
      completedFormData[key].isValid = isValid    
      completedFormData[key].errors = errors    
    }
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
  /* @ts-ignore */
  $: disabled = Object.entries(completedFormData).filter(x => {return !x[1].isValid}).length > 0 || isBusy

  /* @ts-ignore */
  $: getErrorData = Object.entries(completedFormData).filter(x => {return {...x[1]}})  

  $: formStyling = `width: calc(100% - ${padding*2}px); padding: ${padding}px; ${!!style ? style: ''}`  

  $: {
    localStorageKey && initStorageKey();
    clearLocalStorage && initStorageKey()
  }
  //---------------------------
</script>

{#if isReady}
  <Container offset={theme === 'dark' ? 4 : 5}>
    <form class='form-container' class:isBusy={isBusy} data-testid='form-container' style={formStyling} autocomplete="on">

      <div class='overlay' data-testid='busy' class:show={isBusy}>
        <SVG icon='save' size={40} fill={colors.white[0].color}/>
      </div>

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
            {#if data.renderAs === 'fileinput'}
              <FileInput {...stripUnusedProperties(data)} updateForm={updateForm} />
            {/if}          
          </div>                                                            
        {/each}

        
        <section>        
          {#if showPreview}
            <div class='preview-container'>
              <FormPreview show={showPreview} data={completedFormData} />
            </div>

            <div class='error-container'>
              <FormErrors errors={getErrorData} />
            </div> 
          {/if}
        
          {#if showButton}
            <div class='button-container'>
              <slot name='options' />
              <Button  onClick={!disabled && onSubmitHandler} {disabled} dataTestid={'submit-btn'} style={$isMobile ? '' : 'max-width: 200px'}>
                <slot>
                  {isBusy ? 'Saving...' : 'Save'}
                </slot>
              </Button>
            </div>
          {/if}
        </section>
      {:else}
        <div data-testid='empty-form'>
          <slot name='empty'>
            <p>No form data</p>
          </slot>
        </div>
      {/if}
    </form>
  </Container>  
{:else}
  <div />
{/if}


<style lang="scss" scoped>
  .form-container {    
    display: flex;
    flex-wrap: wrap;
    opacity: 1;
    position: relative;
    row-gap: 10px;
    

    section{
      width: 100%
    }    

    .overlay{
      width: 100%;
      height: 100%;      
      position: absolute;
      background: rgba(0, 0, 0, .6);
      top: 0;
      left: 0;
      display: none;
      justify-content: center;
      align-items: center;     
      z-index: 10; 
      &.show{
        display: flex
      }
    }

    &.isBusy{
      opacity: 0.7;
      pointer-events: none;
      cursor: not-allowed
    }

    .preview-container, .error-container, .button-container{
      margin: 10px 0;
    }

    .button-container{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      z-index: 11;
    }

  }
</style>
