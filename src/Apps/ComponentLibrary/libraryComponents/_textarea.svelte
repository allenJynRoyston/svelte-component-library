<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import TextArea from '@components/FormComponents/Textarea/Textarea.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'TextArea',
    importName: '@components/FormComponents/TextArea/TextArea.svelte',
    properties: `
    export let onChange = null
    export let onKeypress = null
    export let updateForm = null;    

    export let placeholder = null
    export let value = '' 
    export let key = null
    export let label = null; 
    export let regex = null;
    export let required = null; 
    export let minLength = null;  
    export let maxLength = null;
    export let contentEdit = false
    export let hasSubmitted = false   
    `,
    props: {
      contentEdit: false,
    }   
  }

  $: livecode = `    
    const props = {
      label: 'Description',
      key: 'description',      
      value: 'blah blah blah blah',
      required: true,
      contentEdit: true,
      minLength: 5
    }
      
    <TextArea {...props} ${propstr}${selectstr}${inputstr} /> 
     `

  const staticprops = {
    label: 'Description',
    key: 'description',      
    value: 'blah blah blah blah',
    required: true,
    contentEdit: true,
    minLength: 5
  }

</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <TextArea {...staticprops} {...props} {...selectprops}
{...inputprops} />
   </div>    

</LibrarySnippet>
