<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import InputTime from '@components/FormComponents/InputTime/InputTime.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'InputTime',
    importName: '@components/FormComponents/InputTime/InputTime.svelte',
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
      label: 'Time',
      key: 'time',
      value: '09:00',
      minTime: '07:00',
      maxTime: '22:00',      
      required: true,
    }

    <InputTime {...props} ${propstr}${selectstr}${inputstr} /> 
     `
     
  const staticprops = {
    label: 'Time',
    key: 'time',
    value: '09:00',
    minTime: '07:00',
    maxTime: '22:00',      
    required: true,
  }

</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <InputTime {...staticprops} {...props} {...selectprops}
{...inputprops} />
   </div>    

</LibrarySnippet>

