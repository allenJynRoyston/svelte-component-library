<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Rating from '@form/Rating.svelte'
  import {svgslist} from '@base/SVG.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;
  
  let eventLog = []
  const events = {
    onChange: (val) => {
      snippet.inputs[0].value = val;
      eventLog = [...eventLog, {action: 'onChange', val}]
    },
    updateForm: (val) => {
      eventLog = [...eventLog, {action: 'updateForm', val}]
    }        
  }

  const snippet = {
    name: 'Rating',
    importName: '@form/Rating.svelte',
    props: {
      required: false,
      locked: false,
      exactfit: false
    },    
    dropdowns: [
      {
        label: 'applyTheme',
        options: [null, 'primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
        value: 0        
      },  
      {
        label: 'emptyIcon',
        options: svgslist, 
        value: 10        
      },
      {
        label: 'fullIcon',
        options: svgslist, 
        value: 11       
      },      
    ], 
    inputs: [
      {forprop: 'value', renderAs: 'input', componentprop: {type: 'number'}, value: 5 },
      {forprop: 'maxLength', renderAs: 'input', componentprop: {type: 'number'}, value: 10 },
      {forprop: 'key', renderAs: 'input', componentprop: {type: 'text'}, value: null },      
    ],
    notes: [
      'key: prop is equivilent to element id.  Only need to alter if you have more then one Input on the same form.',
    ]      
  }

  $: livecode = `    
    <Rating${propstr}${selectstr}${inputstr} /> 
     `
</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {events} {eventLog}>
  <div slot='liveexample'>    
    <Rating {...props} {...selectprops} {...inputprops} {...events}/>
   </div>    
</LibrarySnippet>

