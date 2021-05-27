<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import SelectMulti from '@components/FormComponents/SelectMulti/SelectMulti.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'SelectMulti',
    importName: '@components/FormComponents/SelectMulti/SelectMulti.svelte',
    properties: `
    export let onChange = null
    export let onKeypress = null
    export let updateForm = null;     
    export let type = 'checkbox'
    export let placeholder = null
    export let value = null
    export let key = null
    export let label = null; 
    export let defaultOption = null;   
    export let required = null;
    export let options = []   
    export let onInitFilter = null;
    export let onChangeFilter = null  
    `   
  }

  $: livecode = `    
    const props = {
      type: 'checkbox',
      label: 'Multi Select',
      key: 'selectmulti',      
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

    <SelectMulti {...props} ${propstr}${selectstr}${inputstr} /> 
     `
     
    const staticprops = {
      type: 'checkbox',
      label: 'Multi Select',
      key: 'selectmulti',      
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


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <SelectMulti {...staticprops} {...props} {...selectprops}
{...inputprops} />
   </div>    
</LibrarySnippet>

