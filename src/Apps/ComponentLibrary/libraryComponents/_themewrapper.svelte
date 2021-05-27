<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';
  
  import ExampleBlock from '../components/ExampleBlock.svelte'
  import ThemeWrapper from '@components/ThemeWrapper/ThemeWrapper.svelte'  

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

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
    <ThemeWrapper ${propstr}${selectstr}${inputstr} >
      <ExampleBlock />
    </ThemeWrapper>   
     `


</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <ThemeWrapper  {...props} {...selectprops}
{...inputprops}>
      <ExampleBlock />
    </ThemeWrapper> 
   </div>    
</LibrarySnippet>
