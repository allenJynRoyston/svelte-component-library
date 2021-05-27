<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import FileInput from '@components/FormComponents/FileInput/FileInput.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

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
    <FileInput ${propstr}${selectstr}${inputstr} /> 
     `

</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <FileInput {...props} {...selectprops}
{...inputprops} />
   </div>    

</LibrarySnippet>

<style lang='scss'>

</style>