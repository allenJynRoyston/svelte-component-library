<script lang='ts'>
  import Search from '@components/Search/Search.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
</script>

<h1>Search</h1>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Search from '@components/Search/Search'
  `} />

<CodeBlock title='Properties:' snippet={
  `
  `} />

<LibraryBlock title="Default">
  <Search />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Search />
  `} />  
