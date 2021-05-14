<script lant='ts'>  
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import LoremBlock from '../../../components/LoremBlock/LoremBlock.svelte'

  import InnerContainer from '../../../components/InnerContainer/InnerContainer.svelte'
</script>

<h2>Footer</h2>
<hr>

<CodeBlock title='Properties:' snippet={
  `
  export let height = '100vh'
  `} />

<LibraryBlock title="Light Theme:">
  <div style='height: 100px'>
    <InnerContainer height='50vh'>
      <strong>
        Automatically applies a scrollbar if wrapped in a container that is too small for the content.
        Can set the height manually if you want finer control over how much scroll is available.
      </strong>
      <LoremBlock />
      <LoremBlock />
      <LoremBlock />
    </InnerContainer>
  </div>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <div style='height: 100px'>
    <InnerContainer height='50vh'>
      <strong>
        Automatically applies a scrollbar if wrapped in a container that is too small for the content.
        Can set the height manually if you want finer control over how much scroll is available.
      </strong>
      <LoremBlock />
      <LoremBlock />
      <LoremBlock />
    </InnerContainer>
  </div>
  `} />  

