<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import InputTime from '@form/InputTime/InputTime.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const events = {
    onChange: (val) => {
      snippet.inputs[0].value = val
    } 
  }

  const snippet = {
    name: 'InputTime',
    importName: '@form/InputTime/InputTime.svelte',
    props: {
      required: false,
    },     
    inputs: [
      {forprop: 'value', renderAs: 'inputtime', value: '13:00' },
      {forprop: 'key', renderAs: 'input', componentprop: {type: 'text'}, value: null },
      {forprop: 'label', renderAs: 'input', componentprop: {type: 'text'}, value: 'label' },
      {forprop: 'minTime', renderAs: 'inputtime', value: '07:00' },
      {forprop: 'maxTime', renderAs: 'inputtime', value: '22:00' },      
    ],
    notes: [      
      'key: prop is equivilent to element id.  Only need to alter if you have more then one Input on the same form.',
      'required: only triggers if wrapped in a Form component.  See Form component for more details.',            
    ]      
  }

  $: livecode = `    
    <InputTime${propstr}${selectstr}${inputstr}/> 
     `
</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <InputTime {...props} {...selectprops} {...inputprops} {...events}/>
   </div>    

</LibrarySnippet>

