<script lant='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Form from '@components/Form/Form.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;  

  const snippet = {
    name: 'Form',
    importName: '@components/Form/Form.svelte',
    properties: `
    export let formData = []
    export let onSubmit = null;  
    export let padding = 5
    export let breakpoints = {
      mobile: 480,
      tablet: 800,
      desktop: 1920,
      wide: 2440
    }
    export let style = null
    export let localStorageKey = null;            
    export let idModifier = null;       

    export let clearLocalStorage = false; 
    export let isBusy = false
    export let showPreview = false
    export let showButton = false
    `,
    props: {
      clearLocalStorage: false,
      isBusy: false,
      showPreview: false,
      showButton: false
    },
    dropdowns: [
      {
        label: 'padding',
        options: [0, 5, 10, 25], 
        value: 2   
      }  
    ]    
  }

  $: livecode = `    
    let formData = [
      {
        renderAs: 'input',      
        label: 'Firstname',
        placeholder: 'example: john smith',
        key: 'firstname',
        value: 'allen', 
        regex: /^[a-zA-Z.]+$/,      
        minLength: 3,
        maxLength: 25,
        required: true,
        sizing: {
          desktop: 50,
          mobile: 100
        }
      },
      {
        renderAs: 'input',      
        label: 'Lastname',
        placeholder: 'example: john smith',
        key: 'lastname',
        value: 'royston', 
        regex: /^[a-zA-Z.]+$/,      
        minLength: 3,
        maxLength: 25,
        required: true,
        sizing: {
          desktop: 50,
          mobile: 100
        }
      },
      {
        renderAs: 'input',      
        label: 'Username',
        placeholder: 'example: john smith',
        key: 'username',
        value: 'allen.royston', 
        regex: /^[a-zA-Z.]+$/,      
        minLength: 3,
        maxLength: 25,
        required: true,
        sizing: {
          desktop: 50,
          mobile: 100
        }
      },
      {
        renderAs: 'input', 
        type: 'password', 
        label: 'Password',
        key: 'password',
        value: 'notapassword',
        allowShowToggle: true,
        required: true,
        sizing: {
          desktop: 50,
          mobile: 100
        }
      }                                  
    ]  

  
    <Form {formData} ${propstr}${selectstr}${inputstr} />
     `

     let formData = [
      {
        renderAs: 'input',      
        label: 'Firstname',
        placeholder: 'example: john smith',
        key: 'firstname',
        value: 'allen', 
        regex: /^[a-zA-Z.]+$/,      
        minLength: 3,
        maxLength: 25,
        required: true,
        sizing: {
          desktop: 50,
          mobile: 100
        }
      },
      {
        renderAs: 'input',      
        label: 'Lastname',
        placeholder: 'example: john smith',
        key: 'lastname',
        value: 'royston', 
        regex: /^[a-zA-Z.]+$/,      
        minLength: 3,
        maxLength: 25,
        required: true,
        sizing: {
          desktop: 50,
          mobile: 100
        }
      },
      {
        renderAs: 'input',      
        label: 'Username',
        placeholder: 'example: john smith',
        key: 'username',
        value: 'allen.royston', 
        regex: /^[a-zA-Z.]+$/,      
        minLength: 3,
        maxLength: 25,
        required: true,
        sizing: {
          desktop: 50,
          mobile: 100
        }
      },
      {
        renderAs: 'input', 
        type: 'password', 
        label: 'Password',
        key: 'password',
        value: 'notapassword',
        allowShowToggle: true,
        required: true,
        sizing: {
          desktop: 50,
          mobile: 100
        }
      }                                  
    ]     

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Form  {...props} {...selectprops}
{...inputprops} {formData} />
  </div>    

</LibrarySnippet>

