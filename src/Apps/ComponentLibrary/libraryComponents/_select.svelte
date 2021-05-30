<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Select from '@form/Select/Select.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const events = {
    onChange: (val) => {      
      snippet.inputs[0].value = val.id
    } 
  }

  const snippet = {
    name: 'Select',
    importName: '@form/Select/Select.svelte',
    props: {
      exactfit: false,   
      required: false   
    },    
    inputs: [
      {forprop: 'value', renderAs: 'input', componentprop: {type: 'number'}, value: 1 },
      {forprop: 'defaultOption', renderAs: 'input', componentprop: {type: 'text'}, value: 'Select an option' },
      {forprop: 'key', renderAs: 'input', componentprop: {type: 'text'}, value: null },
      {forprop: 'label', renderAs: 'input', componentprop: {type: 'text'}, value: 'label' }
    ],
    notes: [
      'key: prop is equivilent to element id.  Only need to alter if you have more then one Input on the same form.',
      'required: only triggers if wrapped in a Form component.  See Form component for more details.',            
    ]    
  }

  $: livecode = `    
    const props = {
      options: [
        {id: 1, title: 'option 1'},
        {id: 2, title: 'option 2'},
        {id: 3, title: 'option 3'},
        {id: 4, title: 'option 4'}
      ],
      onInitFilter: (val, options) => {   
        return options.find(x => x.id === val)
      },
      onChangeFilter: (val) => {
        return val && val.id
      },
    }
      
    <Select {...props} ${propstr}${selectstr}${inputstr}/> 
     `
    const staticprops = {
      options: [
        {id: 1, title: 'option 1'},
        {id: 2, title: 'option 2'},
        {id: 3, title: 'option 3'},
        {id: 4, title: 'option 4'}
      ],
      onInitFilter: (val, options) => {   
        return options.find(x => x.id === val)
      },
      onChangeFilter: (val) => {
        return val && val.id
      },
    }

</script>



<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Select {...staticprops} {...props} {...selectprops} {...inputprops} {...events}/>
   </div>    

</LibrarySnippet>
