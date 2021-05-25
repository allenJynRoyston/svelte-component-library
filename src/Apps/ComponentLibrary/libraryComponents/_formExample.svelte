<script>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import FormExample from '@components/FormPremade/FormExample'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'FormExample',
    importName: '@components/FormPremade/FormExample'
  }

  $: livecode = `    
    <FormExample /> 
    `

</script>


<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>   
    <p>Note: This is just a preview of a completed form.</p> 
    <FormExample />   
   </div>    

</LibrarySnippet>
