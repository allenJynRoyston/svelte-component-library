<script lant='ts'>  
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'
  import InnerContainer from '@components/InnerContainer/InnerContainer.svelte'
</script>

<TwoSlot showLeft showRight>
  <h2>InnerContainer</h2>
  <div slot='right' style='display: flex: 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import InnerContainer from '@components/InnerContainer/InnerContainer.svelte'
  `} />

<CodeBlock title='Properties:' snippet={
  `
  export let height = '100vh'
  `} />

<LibraryBlock title="Default:">
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

