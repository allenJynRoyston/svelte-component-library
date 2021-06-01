<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import FileInput from '@form/FileInput/FileInput.svelte'

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
  
  $: snippet = {
    name: 'FileInput',
    importName: '@form/FileInput/FileInput.svelte',    
    props: {
      required: false
    },    
    inputs: [
      {forprop: 'value', renderAs: 'input', componentprop: {type: 'text', placeholder: "C:\\fakepath\\file.PNG"}, value: null },
      {forprop: 'label', renderAs: 'input', componentprop: {type: 'text'}, value: 'label' },
      {forprop: 'key', renderAs: 'input', componentprop: {type: 'text', placeholder: "fileinput"}, value: null },
      {forprop: 'accept', renderAs: 'input', componentprop: {type: 'text', placeholder: 'image/png, image/jpeg, ...'}, value: null }      
    ],
    notes: [
      'required: only triggers if wrapped in a Form component.  See Form component for more details.',
      'key: prop is equivilent to element id.  Only need to alter if you have more then one fileInput on the same form.'
    ]
  }

  $: livecode = `    
    <FileInput ${propstr}${selectstr}${inputstr} /> 
     `

</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {events} {eventLog}>
  <div slot='liveexample'>    
    <FileInput {...props} {...selectprops} {...inputprops} {...events}/>
   </div>    

</LibrarySnippet>

<style lang='scss'>

</style>