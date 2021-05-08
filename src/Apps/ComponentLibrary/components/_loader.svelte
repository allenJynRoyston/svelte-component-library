<script>
  import Loader from '../../../components/Loader/Loader'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

</script>

<h1>Loader</h1>
<hr>

<LibraryBlock title="Live:">
  <Loader show />
</LibraryBlock>

<CodeBlock title='Properties:' snippet={
  `
  export let show = false
  `} />

<CodeBlock open title='Example:' snippet={`
  <Loader show />
`} />  

  