<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import InputDate from '@components/FormComponents/InputDate/InputDate.svelte'



  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

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

    <InputDate {...props} ${propstr}${selectstr}${inputstr} /> 
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


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <InputDate {...staticprops} {...props} {...selectprops}
{...inputprops} />
   </div>    

</LibrarySnippet>

<style lang='scss'>

</style>