<script>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import FormExample from '@components/FormPremade/FormExample'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'FormExample',
    importName: '@components/FormPremade/FormExample'
  }

  $: livecode = `    
    <FormExample /> 
    `

</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>   
    <p>Note: This is just a preview of a completed form.</p> 
    <FormExample />   
   </div>    

</LibrarySnippet>
