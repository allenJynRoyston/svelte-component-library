<script>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
  
  import FormExample from '@components/FormPremade/FormExample'

</script>

<TwoSlot showLeft showRight>
  <h2>FormExample</h2>
  <div slot='right' style='display: flex; gap 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import FormExample from '@components/FormPremade/FormExample'
  `} />

<LibraryBlock title="Default:">
  <FormExample />       
</LibraryBlock>



<CodeBlock title='Properties:' snippet={
  `
  // props:
  export let formData = []
  export let onSubmit = null;  
  export let padding = 10
  export let breakpoints = {
    mobile: 480,
    tablet: 800,
    desktop: 1920,
    wide: 2440
  }
  export let localStorageKey = null;    
  export let clearLocalStorage = true;     
  export let idModifier = null;       
  export let isBusy = false
  export let showPreview = false
  export let style = null
  export let showButton = true
  `} />


<CodeBlock title='Example:' snippet={
  `
  // example useage:
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
        desktop: 25,
        mobile: 50
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
        desktop: 25,
        mobile: 50
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
        desktop: 25,
        mobile: 50
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
        mobile: 50
      }
    },
    {
      renderAs: 'input',      
      type: 'number',
      label: 'Age',
      placeholder: 'example: john smith',
      key: 'age',
      value: '25', 
      regex: /^[0-9]+$/,      
      minLength: 1,
      maxLength: 3,
      required: true,
      sizing: {
        desktop: 25,
        mobile: 50
      }
    },
    {
      renderAs: 'input',       
      label: 'City',
      key: 'city',
      value: 'Reno',
      required: true,
      sizing: {
        desktop: 25,
        mobile: 50
      }
    },    
    {
      renderAs: 'textarea', 
      label: 'Description',
      key: 'description',      
      value: 'blah blah blah blah',
      required: true,
      contentEdit: true,
      minLength: 5,
      sizing: {
        desktop: 100,
        mobile: 100
      }      
    },
    {
      renderAs: 'date', 
      label: 'Date',
      key: 'date',
      value: '12-01-1982',
      minDate: '01-01-1950',
      maxDate: '01-01-2020',      
      required: true,
      sizing: {
        desktop: 50,
        mobile: 100
      } 
    },  
    {
      renderAs: 'time', 
      label: 'Time',
      key: 'time',
      value: '09:00',
      minTime: '07:00',
      maxTime: '22:00',      
      required: true,
      sizing: {
        desktop: 50,
        mobile: 100
      }       
    },     
    {
      renderAs: 'select', 
      label: 'Select',
      key: 'select',      
      value: 2,
      defaultOption: 'Select an option',
      options: [
        {id: 1, title: 'option 1'},
        {id: 2, title: 'option 2'},
        {id: 3, title: 'option 3'},
        {id: 4, title: 'option 4'}
      ],
      onInitFilter: (val, options) => {   
        return options.find(x => x.id === val)
      },
      onChangeFilter: (val) => {
        return val && val.id
      },
      required: true
    },      
    {
      renderAs: 'fileinput', 
      label: 'File Input',
      key: 'fileinput',      
      value: 2,
      accept: 'image/png, image/jpeg',
      required: false
    },      
    {
      renderAs: 'selectmulti', 
      type: 'checkbox',
      label: 'Multi Select',
      key: 'selectmulti',      
      value: [1, 3],      
      options: [
        {id: 1, title: 'option 1'},
        {id: 2, title: 'option 2'},
        {id: 3, title: 'option 3'},
        {id: 4, title: 'option 4'}
      ],
      onInitFilter: (arr, options) => {  
        return options.map((x) => {
          arr.forEach(v => {
            x._selected = !x._selected ? (x.id === v) : x._selected
          })
          return x
        })
      },
      onChangeFilter: (arr) => {           
        return arr.map(x => {
          return x.id
        })
      },
      required: true        
    },   
    {
      renderAs: 'rating',    
      type: 'star',
      label: 'Ratings',
      key: 'rating',      
      value: 2,                
      required: true,
      maxLength: 10,  
      slots: {
        selected: '❤',
        notSelected: '♡'
      },
      fixedWidth: '40px'       
    },    
    {
      renderAs: 'checkbox', 
      label: 'Agree',
      key: 'agree',
      text: 'Do you agree to the terms and agreements?',
      value: true,
      required: true     
    },                                   
  ]

    const props = {
      formData,
      onSubmit: () => {}, 
      idModifier: 'form-1',
      padding: 20,
      localStorageKey: 'userdata'      
    }


    <Form {...props} showButton clearLocalStorage showPreview />
  `} />