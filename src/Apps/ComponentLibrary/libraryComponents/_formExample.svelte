<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Form from '@form/FormBuilder.svelte'
  import {exampleFormData} from '@examples/FormExample.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'Form (with example)',
    importName: '@components/FormPremade/FormExample'
  }

  console.log(exampleFormData)

  $: livecode = `    
  let formData = ${JSON.stringify(exampleFormData, null, 4)}


  <Form {formData} />
    `

  const staticprops = {
    formData: exampleFormData,        
  }    

</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>   
    <Form {...staticprops}/>   
   </div>    

</LibrarySnippet>
