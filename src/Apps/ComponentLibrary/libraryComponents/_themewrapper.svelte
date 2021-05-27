<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';
  
  import ExampleBlock from '../components/ExampleBlock.svelte'
  import ThemeWrapper from '@components/ThemeWrapper/ThemeWrapper.svelte'  

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'ThemeWrapper',
    importName: '@components/ThemeWrapper/ThemeWrapper.svelte',
    properties: `
    export let forcetheme = null;
    export let invert = false;  
    `,
    props: {
      invert: false
    }, 
    dropdowns: [
      {
        label: 'forcetheme',
        options: [null, 'light', 'dark'], 
        value: 0        
      }    
    ]
  }

  $: livecode = `    
    <ThemeWrapper ${fullstr} >
      <ExampleBlock />
    </ThemeWrapper>   
     `


</script>


<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <ThemeWrapper  {...props} {...selectprops}>
      <ExampleBlock />
    </ThemeWrapper> 
   </div>    
</LibrarySnippet>
