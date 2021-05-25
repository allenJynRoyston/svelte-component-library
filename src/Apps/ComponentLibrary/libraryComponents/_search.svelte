<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Search from '@components/Search/Search.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

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
    <Search ${fullstr} />
     `  
</script>

<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <Search  {...props} {...selectprops} />
  </div>    

</LibrarySnippet>
