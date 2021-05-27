<script lang='ts'>  
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'CodeBlock',
    importName: '@components/CodeBlock/CodeBlock.svelte',
    properties: `
    export let title = null;
    export let open = false;
    export let nowrap = false;
    export let show = false;
    `,
    props: {
      open: true,
      show: true,      
      nowrap: false,  
    }, 
    dropdowns: [
      {
        label: 'title',
        options: ['Title', 'Hello World'], 
        value: 0        
      }   
    ]
  }

  $: livecode = `    
    <CodeBlock ${propstr}${selectstr}${inputstr} snippet={'
      const greeting = "hello world"
      <h1>{greeting}<h1>
    '} />      
     `  

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <CodeBlock {...props} {...selectprops}
{...inputprops} snippet={`
      const greeting = "hello world"
      <h1>{greeting}<h1>
    `} />  
   </div>    
</LibrarySnippet>
