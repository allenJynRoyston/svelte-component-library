<script lang='ts'>  
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

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
    <CodeBlock ${fullstr} snippet={'
      const greeting = "hello world"
      <h1>{greeting}<h1>
    '} />      
     `  

</script>

<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <CodeBlock {...props} {...selectprops} snippet={`
      const greeting = "hello world"
      <h1>{greeting}<h1>
    `} />  
   </div>    
</LibrarySnippet>
