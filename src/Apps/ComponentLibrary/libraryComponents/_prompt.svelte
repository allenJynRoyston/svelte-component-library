<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@base/Button.svelte'
  import TwoSlot from '@base/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@base/CodeBlock.svelte'

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
