<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import InputTime from '@components/FormComponents/InputTime/InputTime.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

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

    <InputTime {...props} ${fullstr} /> 
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


<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <InputTime {...staticprops} {...props} {...selectprops} />
   </div>    

</LibrarySnippet>

