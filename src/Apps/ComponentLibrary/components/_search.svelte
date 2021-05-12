<script lang='ts'>
  import Search from '../../../components/Search/Search'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'

</script>

<h1>Search</h1>
<hr>

<LibraryBlock title="Default:">
  <Search />
</LibraryBlock>

<ThemeWrapper theme='dark'>
  <LibraryBlock title="Dark Theme:">
    <Search />
  </LibraryBlock>
</ThemeWrapper>

<CodeBlock title='Properties:' snippet={
  `
  `} />

<CodeBlock open title='Example:' snippet={`
  <Search />
  `} />  
