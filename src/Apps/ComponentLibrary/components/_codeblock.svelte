<script lang='ts'>  
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

</script>

<h2>Code Block</h2>
<hr>


<LibraryBlock title="Live:">
  <CodeBlock open title='Example:' snippet={`
    const greeting = "hello world"
    <h1>{greeting}<h1>
  `} />  
</LibraryBlock>

<CodeBlock title='Properties:' snippet={`
  export let title = null;
  export let open = false;
  export let snippet = '';     
  export let lang = 'typescript'
`} />

<CodeBlock open title='Example:' snippet={`
  <CodeBlock open title='Example:' snippet={'
    const greeting = "hello world"
    <h1>{greeting}<h1>
  '} />  
`} />  

