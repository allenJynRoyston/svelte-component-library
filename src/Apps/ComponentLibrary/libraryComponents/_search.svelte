<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Search from '@components/Search/Search.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'Search',
    importName: '@components/Search/Search.svelte',
    props: {
      hideSearchIcon: false,
      hideClear: false,
      hideSearchButton: false,
    }, 
    inputs: [
      {forprop: 'debounceTime', renderAs: 'input', componentprop: {type: 'number'}, value: 300 },      
    ]       
  }
  

  $: livecode = `    
    <Search ${propstr}${selectstr}${inputstr} />
     `  
</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Search  {...props} {...selectprops} {...inputprops} />
  </div>    

</LibrarySnippet>
