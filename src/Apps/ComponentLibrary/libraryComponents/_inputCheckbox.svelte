<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import InputCheckbox from '@components/FormComponents/InputCheckbox/InputCheckbox.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

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

    <InputCheckbox {...props} ${propstr}${selectstr}${inputstr} /> 
     `
     
  const staticprops = {
    label: 'Agree',
    key: 'agree',
    text: 'Do you agree to the terms and agreements?',
    value: true,
    required: true     
  }

</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <InputCheckbox {...staticprops} {...props} {...selectprops}
{...inputprops} />
   </div>    

</LibrarySnippet>

<style lang='scss'>

</style>