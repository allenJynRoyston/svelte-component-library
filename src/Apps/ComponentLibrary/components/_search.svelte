<script lang='ts'>
  import Search from '../../../components/Search/Search'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'

</script>

<h1>Search</h1>
<hr>

<ThemeWrapper theme='light' delay={1} lock>
  <LibraryBlock title="Light Theme:">
    <Search />
  </LibraryBlock>
</ThemeWrapper>

<ThemeWrapper theme='dark' delay={1} lock>
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
