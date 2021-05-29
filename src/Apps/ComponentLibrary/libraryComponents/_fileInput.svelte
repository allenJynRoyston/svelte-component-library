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