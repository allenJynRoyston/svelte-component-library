<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import Prompt from '@components/Prompt/Prompt.svelte'

</script>

<TwoSlot>
  <h2>Prompt</h2>
  <div slot='right' style='display: flex; gap 10px'>
  </div>
</TwoSlot>
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
