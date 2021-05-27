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
    properties: `
    export let debounceTime = 0;
    export let hideClear = false;
    export let searchBtn = false;
    export let onSearch = () => {}

    `,
    props: {
      hideClear: false,
      searchBtn: false
    }, 
    dropdowns: [
      {
        label: 'debounceTime',
        options: [null, 300, 700, 1000], 
        value: 0        
      }     
    ]
  }

  $: livecode = `    
    <Search ${propstr}${selectstr}${inputstr} />
     `  
</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Search  {...props} {...selectprops}
{...inputprops} />
  </div>    

</LibrarySnippet>
