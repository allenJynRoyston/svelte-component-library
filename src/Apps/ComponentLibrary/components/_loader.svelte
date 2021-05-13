<script>
  import Loader from '../../../components/Loader/Loader'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'

</script>

<h1>Loader</h1>
<hr>

<LibraryBlock title="Default:">
  <Loader show />
</LibraryBlock>

<ThemeWrapper theme='dark' delay={1}>
  <LibraryBlock title="Dark Theme:">
    <Loader show />
  </LibraryBlock>
</ThemeWrapper>

<CodeBlock title='Properties:' snippet={
  `
  export let show = false
  `} />

<CodeBlock open title='Example:' snippet={`
  <Loader show />
`} />  

  