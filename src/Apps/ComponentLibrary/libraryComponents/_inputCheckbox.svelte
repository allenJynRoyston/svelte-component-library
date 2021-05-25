<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import InputCheckbox from '@components/FormComponents/InputCheckbox/InputCheckbox.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'InputCheckbox',
    importName: '@components/FormComponents/InputCheckbox/InputCheckbox.svelte',
    properties: `
    export let onChange = null
    export let onKeypress = null
    export let updateForm = null;     
    export let placeholder = null 
    export let value = false
    export let text = null;  
    export let key = null
    export let label = null; 
    export let required = null;
    `   
  }

  $: livecode = `    
    const props = {
      label: 'Agree',
      key: 'agree',
      text: 'Do you agree to the terms and agreements?',
      value: true,
      required: true     
    }

    <InputCheckbox {...props} ${fullstr} /> 
     `
     
  const staticprops = {
    label: 'Agree',
    key: 'agree',
    text: 'Do you agree to the terms and agreements?',
    value: true,
    required: true     
  }

</script>


<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <InputCheckbox {...staticprops} {...props} {...selectprops} />
   </div>    

</LibrarySnippet>

<style lang='scss'>

</style>