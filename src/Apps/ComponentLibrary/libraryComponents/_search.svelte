<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Search from '@components/Search/Search.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  let eventLog = []
  const events = {
    onUpdate: (val) => {      
      eventLog = [...eventLog, {action: 'onUpdate', val}]
    } 
  }

  const snippet = {
    name: 'Search',
    importName: '@components/Search/Search.svelte',
    props: {
      hideSearchIcon: false,
      hideClear: false,
      hideSearchButton: false,
    }, 
    inputs: [
      {forprop: 'value', renderAs: 'input', componentprop: {type: 'text'}, value: null },      
      {forprop: 'placeholder', renderAs: 'input', componentprop: {type: 'text'}, value: 'Placeholder text...' },      
      {forprop: 'debounceTime', renderAs: 'input', componentprop: {type: 'number'}, value: 300 },      
    ]       
  }
  

  $: livecode = `    
    <Search ${propstr}${selectstr}${inputstr} />
     `  
</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {events} {eventLog} >
  <div slot='liveexample'>    
    <Search  {...props} {...selectprops} {...inputprops} {...events}/>
  </div>    

</LibrarySnippet>
