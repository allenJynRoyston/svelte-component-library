<script lang='ts'>
  //--------------------------- IMPORTS  
  import {Form} from '../index'

  //--------------------------- COMPONENT PROPS
  export let isBusy;
  export let key;  
  export let content;
  export let onSubmit = () => {}
  
  //---------------------------

  //--------------------------- VARS   
  const formProps = {
    formData: [
      {
        renderAs: 'textarea', 
        key,      
        value: content,
        required: true,
        contentEdit: true,
      }    
    ],
    onSubmit,
    padding: 20,
    localStorageKey: 'commentId',
    clearLocalStorage: true
  }      

  
  //--------------------------- ONMOUNT

  //---------------------------   


  //--------------------------- $
  //---------------------------
</script>

<Form {...formProps} {isBusy} style={'border: none'} >
  Update
</Form>