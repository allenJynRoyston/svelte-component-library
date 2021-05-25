<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import TextArea from '@components/FormComponents/Textarea/Textarea.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

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
      
    <TextArea {...props} ${fullstr} /> 
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


<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <TextArea {...staticprops} {...props} {...selectprops} />
   </div>    

</LibrarySnippet>
