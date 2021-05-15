<script lang='ts'>  
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

</script>

<h2>Code Block</h2>
<hr>

<CodeBlock open title='Import:' snippet={`
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
  `} />

<CodeBlock title='Properties:' snippet={`
  export let title = null;
  export let open = false;
  export let snippet = '';     
  export let lang = 'typescript'
  `} />

<LibraryBlock title="Default:">
  <CodeBlock open title='Example:' snippet={`
    const greeting = "hello world"
    <h1>{greeting}<h1>
  `} />  
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <CodeBlock open title='Example:' snippet={'
    const greeting = "hello world"
    <h1>{greeting}<h1>
  '} />  
  `} />  

