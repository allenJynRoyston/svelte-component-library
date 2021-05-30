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
    props: {
      clearLocalStorage: true,
      isBusy: false,
      showPreview: false,
      showButton: false
    },
    dropdowns: [

    ],
    inputs: [
      {forprop: 'padding', renderAs: 'input', componentprop: {type: 'number'}, value: 10},
      {forprop: 'localStorageKey', renderAs: 'input', componentprop: {type: 'text'}, value: 'autosave'},      
      {forprop: 'idModifier', renderAs: 'input', componentprop: {type: 'text'}, value: null},      
      {forprop: 'style', renderAs: 'input', componentprop: {type: 'text', placeholder: 'outline: 1px solid red'}, value: null},      
    ],
    notes: [
      'localStorageKey: if this prop is not left blank, then data is saved in localStorage on page refresh with localStorageKey acting as the key.',
      'clearLocalStorage: if localStorageKey is not blank and clearLocalStorage is true, then it will retain form data on refresh but clear localStorage on load.  This ensures that any sensitive or personal information used for the Form is cleared out.  You can see this process if you open your brower dev tools and watch the localStorage tab.',
      'For the purposes of this demo, localStorage is always cleared out on refresh.'
    ]
  }

  $: livecode = `   
    
    // this is optional
    const breakpoints = {
      mobile: 480,
      tablet: 800,
      desktop: 1080,
      wide: 1440
    }

    const formData = [
      {
        renderAs: 'input',      
        label: 'Firstname',
        key: 'firstname',
        value: 'John', 
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
        key: 'lastname',
        value: 'Smith', 
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
        placeholder: 'example: john.smith',
        key: 'username',
        value: 'john.smith', 
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

  
    <Form {formData} {breakpoints}${propstr}${selectstr}${inputstr}/>
     `

     let formData = [
      {
        renderAs: 'input',      
        label: 'Firstname',
        key: 'firstname',
        value: 'John', 
        regex: /^[a-zA-Z.]+$/,      
        minLength: 3,
        maxLength: 25,
        required: true,
        sizing: {
          desktop: 25,
          tablet: 50,
          mobile: 100
        }
      },
      {
        renderAs: 'input',      
        label: 'Lastname',
        key: 'lastname',
        value: 'Smith', 
        regex: /^[a-zA-Z.]+$/,      
        minLength: 3,
        maxLength: 25,
        required: true,
        sizing: {
          desktop: 25,
          tablet: 50,
          mobile: 100
        }
      },
      {
        renderAs: 'input',      
        label: 'Username',
        placeholder: 'example: john.smith',
        key: 'username',
        value: 'john.smith', 
        regex: /^[a-zA-Z.]+$/,      
        minLength: 3,
        maxLength: 25,
        required: true,
        sizing: {
          desktop: 25,
          tablet: 50,
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
          desktop: 25,
          tablet: 50,
          mobile: 100
        }
      }                                  
    ]   

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Form  {...props} {...selectprops} {...inputprops} {formData} />
  </div>    

</LibrarySnippet>

