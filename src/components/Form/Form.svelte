<script lang='ts'>
  //--------------------------- IMPORTS
  import { onMount } from 'svelte';
  import {Button, Input, Textarea, FormErrors, FormPreview} from '../index'
  //---------------------------

  //--------------------------- VARS
  const completedFormData = {}
  let isReady = false
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
  //---------------------------

  //--------------------------- ONMOUNT
	onMount(async () => {
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
    onSubmit && onSubmit(completedFormData)
  }

  const updateForm = ({key, val, isValid, errors}) => {
    completedFormData[key].value = val
    completedFormData[key].isValid = isValid    
    completedFormData[key].errors = errors    
  }

  const stripUnusedProperties = (data) => {
    const {renderAs} = data;
    switch(renderAs){
      case 'textarea':
        delete data['type']
      break;
    }

    delete data['renderAs']

    return data
  }
  //---------------------------  
  
  //--------------------------- $
  $: disabled = Object.entries(completedFormData).filter(x => {return !x[1].isValid}).length > 0

  $: getErrorData = Object.entries(completedFormData).filter(x => {return {...x[1]}})
  //---------------------------


</script>

{#if isReady}
  <form class='form-container'>
    {#if formData.length > 0}
      {#each formData as data, i}
        {#if data.renderAs === 'input'}
          <Input {...stripUnusedProperties(data)} updateForm={updateForm} />
        {/if}
        {#if data.renderAs === 'textarea'}
          <Textarea {...stripUnusedProperties(data)} updateForm={updateForm} />
        {/if}            
      {/each}


      <div class='preview-container'>
        <FormPreview data={completedFormData} />
      </div>

      <div class='error-container'>
        <FormErrors errors={getErrorData} />
      </div>


      <div class='button-container'>
        <Button onClick={onSubmitHandler} disabled={disabled}>Save</Button>
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
    padding: 20px 10px;   
    border: 1px solid black;
    border-radius: 5px;   

    .preview-container, .error-container, .button-container{
      margin: 10px 0;
    }

  }
</style>
