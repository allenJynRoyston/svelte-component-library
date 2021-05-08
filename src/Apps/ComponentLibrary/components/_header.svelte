<script lang='ts'>
  import Header from '../../../components/Header/Header.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
</script>

<h2>Header</h2>
<hr>

<LibraryBlock title="Live:">
  <Header >
    <h1>
      Header Name
    </h1>
  </Header>
</LibraryBlock>

<CodeBlock title='Properties:' snippet={`
`} />

<CodeBlock open title='Example:' snippet={`
  <Header >
    <h1>
      Website Header
    </h1>
  </Header>
`} />  