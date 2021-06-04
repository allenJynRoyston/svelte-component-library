<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import SelectMulti from '@form/SelectMulti.svelte'

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
    onClick: (val) => {
      eventLog = [...eventLog, {action: 'onClick', val}]
    },
    updateForm: (val) => {
      eventLog = [...eventLog, {action: 'updateForm', val}]
    },                    
  }  


  const snippet = {
    name: 'SelectMulti',
    importName: '@form/SelectMulti.svelte',
    props: {
      required: false,
    },    
    inputs: [
      {forprop: 'key', renderAs: 'input', componentprop: {type: 'text'}, value: null },
      {forprop: 'label', renderAs: 'input', componentprop: {type: 'text'}, value: 'label' },
    ],
    notes: [
      'key: prop is equivilent to element id.  Only need to alter if you have more then one Input on the same form.',
      'required: only triggers if wrapped in a Form component.  See Form component for more details.',            
    ]   
  }

  $: livecode = `    
    const props = { 
      value: [1, 3],      
      options: [
        {id: 1, title: 'option 1'},
        {id: 2, title: 'option 2'},
        {id: 3, title: 'option 3'},
        {id: 4, title: 'option 4'}
      ],
      onInitFilter: (arr, options) => {  
        return options.map((x) => {
          arr.forEach(v => {
            x._selected = !x._selected ? (x.id === v) : x._selected
          })
          return x
        })
      },
      onChangeFilter: (arr) => {           
        return arr.map(x => {
          return x.id
        })
      },
      required: true    
    }

    <SelectMulti {...props}${propstr}${selectstr}${inputstr} /> 
     `
     
    const staticprops = { 
      value: [1, 3],      
      options: [
        {id: 1, title: 'option 1'},
        {id: 2, title: 'option 2'},
        {id: 3, title: 'option 3'},
        {id: 4, title: 'option 4'}
      ],
      onInitFilter: (arr, options) => {  
        return options.map((x) => {
          arr.forEach(v => {
            x._selected = !x._selected ? (x.id === v) : x._selected
          })
          return x
        })
      },
      onChangeFilter: (arr) => {           
        return arr.map(x => {
          return x.id
        })
      },
      required: true    
    }

</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {events} {eventLog} >
  <div slot='liveexample'>    
    <SelectMulti {...staticprops} {...props} {...selectprops} {...inputprops} {...events} />
   </div>    
</LibrarySnippet>

