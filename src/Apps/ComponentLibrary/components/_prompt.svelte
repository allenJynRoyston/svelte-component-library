<script lang='ts'>
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import Prompt from '@components/Prompt/Prompt.svelte'

</script>

<h1>Prompt</h1>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Prompt from '@components/Prompt/Prompt'
  `} />

<CodeBlock title='Properties:' snippet={
  `
  `} />

<LibraryBlock title="Default">
  <Prompt />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Prompt />
  `} />  
