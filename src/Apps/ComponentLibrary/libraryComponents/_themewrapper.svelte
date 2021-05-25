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
    export let theme = 'light'
    export let delay = 1;
    export let ele = null;
    export let lock = false;
    export let alwayslight = false;
    export let alwaysdark = false;
    export let refresh = true;
    export let themeWatch = false;    
    `,
    props: {
      lock: false,
      alwayslight: true,
      alwaysdark: false,
      themeWatch: false,
      refresh: true,
    }, 
    dropdowns: [
      {
        label: 'theme',
        options: ['light', 'dark'], 
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
