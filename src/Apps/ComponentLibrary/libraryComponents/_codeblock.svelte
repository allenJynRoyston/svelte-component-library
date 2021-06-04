<script lang='ts'>  
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import CodeBlock from '@base/CodeBlock.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'CodeBlock',
    importName: '@base/CodeBlock.svelte',
    props: {
      open: true,
      show: true,      
      nowrap: false,  
    }, 
    inputs: [
      {forprop: 'title', renderAs: 'input', componentprop: {type: 'text'}, value: 'Codeblock title' },      
      {forprop: 'snippet', renderAs: 'textarea', value: `
      const greeting = 'Hello World!'
      <h1>{greeting}</h1>
      ` },      
    ]      
  }

  $: livecode = `    
    <CodeBlock ${propstr}${selectstr}${inputstr} />      
     `  

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <CodeBlock {...props} {...selectprops} {...inputprops}/>  
   </div>    
</LibrarySnippet>
