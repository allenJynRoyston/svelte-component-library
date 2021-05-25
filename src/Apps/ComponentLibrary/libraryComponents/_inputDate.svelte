<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import InputDate from '@components/FormComponents/InputDate/InputDate.svelte'



  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'InputDate',
    importName: '@components/FormComponents/InputDate/InputDate.svelte',
    properties: `
    export let onChange = null
    export let onKeypress = null
    export let updateForm = null;    
    
    export let placeholder = null
    export let value = ''
    export let key = null
    export let label = null; 
    export let minDate = null;
    export let maxDate = null;    
    export let required = null;
    `   
  }

  $: livecode = `    
    const props = {
      label: 'Date',
      key: 'date',
      value: '12-01-1982',
      minDate: '01-01-1950',
      maxDate: '01-01-2020',      
      required: true,
    }

    <InputDate {...props} ${fullstr} /> 
     `
     
  const staticprops = {
    label: 'Date',
    key: 'date',
    value: '12-01-1982',
    minDate: '01-01-1950',
    maxDate: '01-01-2020',      
    required: true,
  }

</script>


<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <InputDate {...staticprops} {...props} {...selectprops} />
   </div>    

</LibrarySnippet>

<style lang='scss'>

</style>