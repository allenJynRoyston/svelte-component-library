<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import InputDate from '@form/InputDate/InputDate.svelte'



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
    onKeypress: (val) => {
      eventLog = [...eventLog, {action: 'onKeypress', val}]
    },
    updateForm: (val) => {
      eventLog = [...eventLog, {action: 'updateForm', val}]
    }        
  }

  const snippet = {
    name: 'InputDate',
    importName: '@form/InputDate/InputDate.svelte',
    props: {
      required: false,
    },     
    inputs: [
      {forprop: 'value', renderAs: 'inputdate', value: '01-30-2021' },
      {forprop: 'key', renderAs: 'input', componentprop: {type: 'text'}, value: null },
      {forprop: 'label', renderAs: 'input', componentprop: {type: 'text'}, value: 'label' },
      {forprop: 'minDate', renderAs: 'inputdate', value: '01-01-1950' },
      {forprop: 'maxDate', renderAs: 'inputdate', value: '01-01-2025' },      
    ],
    notes: [      
      'key: prop is equivilent to element id.  Only need to alter if you have more then one Input on the same form.',
      'required: only triggers if wrapped in a Form component.  See Form component for more details.',            
    ]         
  }

  $: livecode = `    
    <InputDate {...props} ${propstr}${selectstr}${inputstr} /> 
     `
    
</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {events} {eventLog}>
  <div slot='liveexample'>    
    <InputDate {...props} {...selectprops} {...inputprops} {...events}/>
   </div>    

</LibrarySnippet>

<style lang='scss'>

</style>