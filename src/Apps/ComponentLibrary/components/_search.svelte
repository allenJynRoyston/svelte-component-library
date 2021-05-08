<script>
  import Search from '../../../components/Search/Search'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

</script>

<h1>Search</h1>
<hr>

<LibraryBlock title="Live:">
  <Search />
</LibraryBlock>

<CodeBlock title='Properties:' snippet={
  `
  `} />

<CodeBlock open title='Example:' snippet={`
  <Search />
  `} />  
