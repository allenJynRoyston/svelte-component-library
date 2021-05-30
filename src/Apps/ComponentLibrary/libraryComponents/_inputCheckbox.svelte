<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import InputCheckbox from '@components/FormComponents/InputCheckbox/InputCheckbox.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const events = {
    onChange: (val) => {
      snippet.props.checked = val
    } 
  }

  $: snippet = {
    name: 'InputCheckbox',
    importName: '@form/InputCheckbox/InputCheckbox.svelte',
    props: {
      required: false,
      checked: true,
    },         
    inputs: [      
      {forprop: 'text', renderAs: 'input', componentprop: {type: 'text'}, value: 'Checkbox text goes here.' },
      {forprop: 'key', renderAs: 'input', componentprop: {type: 'text'}, value: null },
      {forprop: 'label', renderAs: 'input', componentprop: {type: 'text'}, value: 'label' },
    ],
    notes: [
      'key: prop is equivilent to element id.  Only need to alter if you have more then one Input on the same form.',
      'required: only triggers if wrapped in a Form component.  See Form component for more details.',            
    ]    
  }

  $: livecode = `    
    <InputCheckbox${propstr}${selectstr}${inputstr}/> 
     `


</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <InputCheckbox {...props} {...selectprops} {...inputprops} {...events} />
   </div>    
</LibrarySnippet>

<style lang='scss'>

</style>