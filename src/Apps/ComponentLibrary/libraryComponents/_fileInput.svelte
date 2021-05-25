<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import FileInput from '@components/FormComponents/FileInput/FileInput.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'Button',
    importName: '@components/FormComponents/FileInput/FileInput.svelte',
    properties: `
    export let onChange = null
    export let updateForm = null;    

    export let type = null  
    export let placeholder = null
    export let value = ''
    export let key = null
    export let label = null;
    export let required = null;
    export let accept = null
    `
  }

  $: livecode = `    
    <FileInput ${fullstr} /> 
     `

</script>


<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <FileInput {...props} {...selectprops} />
   </div>    

</LibrarySnippet>

<style lang='scss'>

</style>