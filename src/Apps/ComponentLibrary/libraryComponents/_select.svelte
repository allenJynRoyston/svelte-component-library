<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Select from '@components/FormComponents/Select/Select.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'Select',
    importName: '@components/FormComponents/Select/Select.svelte',
    properties: `
    export let onChange = null
    export let onKeypress = null 
    export let updateForm = null;    
    export let placeholder = null
    export let value = null
    export let key = null
    export let label = null;
    export let defaultOption = null;   
    export let required = null;
    export let options = []  
    export let onInitFilter = null;
    export let onChangeFilter = null  
    export let exactfit = false;  
    `,
    props: {
      exactfit: false,
    }   
  }

  $: livecode = `    
    const props = {
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
    }
      
    <Select {...props} ${propstr}${selectstr}${inputstr} /> 
     `
  const staticprops = {
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
    }

</script>



<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Select {...staticprops} {...props} {...selectprops}
{...inputprops} />
   </div>    

</LibrarySnippet>
