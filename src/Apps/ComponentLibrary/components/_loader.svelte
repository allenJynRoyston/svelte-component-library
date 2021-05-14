<script>
  import Loader from '../../../components/Loader/Loader'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

</script>

<h1>Loader</h1>
<hr>

<CodeBlock title='Properties:' snippet={
  `
  export let show = false
  export let rounded = false;
  `} />

<LibraryBlock title="Default:">
  <Loader show />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Loader show />
  `} />  

<LibraryBlock title="Rounded:">
  <Loader show rounded />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  <Loader show rounded />
  `} />  