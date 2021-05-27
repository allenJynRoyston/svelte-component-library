<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Input from '@components/FormComponents/Input/Input.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'Input',
    importName: '@components/FormComponents/Input/Input.svelte',
    properties: `
    export let onChange = null
    export let onKeypress = null
    export let updateForm = null;    

    export let type = null  
    export let placeholder = null
    export let value = ''
    export let noBottomMargin = false
    export let key = null
    export let label = null;
    export let regex = null;
    export let required = null;
    export let allowShowToggle = true;  
    export let minLength = null;
    export let maxLength = null;
    export let hasSubmitted = false;
    `,
    props: {
      noBottomMargin: false,
      allowShowToggle: false,
    },    
    dropdowns: [
      {
        label: 'type',
        options: ['text', 'password'], 
        value: 0        
      }    
    ]     
  }

  $: livecode = `    
    const props = {
      label: 'Input',
      placeholder: 'Placeholder...',
      required: true
    }
      
    <Input {...props} ${propstr}${selectstr}${inputstr} /> 
     `
  const staticprops = {
    label: 'Input',
    placeholder: 'Placeholder...',
    required: true
  }

</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Input {...staticprops} {...props} {...selectprops}
{...inputprops} />
   </div>    

</LibrarySnippet>
