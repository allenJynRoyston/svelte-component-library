<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import TextArea from '@form/Textarea/Textarea.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'TextArea',
    importName: '@form/TextArea/TextArea.svelte',
    props: {
      contentEdit: false,
      required: false
    },    
    inputs: [
      {forprop: 'value', renderAs: 'input', componentprop: {type: 'text'}, value: null },
      {forprop: 'key', renderAs: 'input', componentprop: {type: 'text'}, value: null },
      {forprop: 'label', renderAs: 'input', componentprop: {type: 'text'}, value: 'label' },
      {forprop: 'regex', renderAs: 'input', componentprop: {type: 'text'}, value: '^[a-zA-Z.]+$' },
      {forprop: 'minLength', renderAs: 'input', componentprop: {type: 'number'}, value: 5 },
      {forprop: 'maxLength', renderAs: 'input', componentprop: {type: 'number'}, value: 25 },
    ],
    notes: [
      'key: prop is equivilent to element id.  Only need to alter if you have more then one Input on the same form.',
      'required: only triggers if wrapped in a Form component.  See Form component for more details.',            
    ]  
  }

  $: livecode = `    
    <TextArea${propstr}${selectstr}${inputstr} /> 
     `
</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <TextArea {...props} {...selectprops} {...inputprops} />
   </div>    

</LibrarySnippet>
