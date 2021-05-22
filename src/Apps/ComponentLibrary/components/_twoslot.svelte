<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
</script>

<TwoSlot showLeft showRight>
  <h2>TwoSlot</h2>
  <div slot='right' style='display: flex: 10px'>
  </div>
</TwoSlot>
<hr>


<CodeBlock open title='Import:' snippet={`
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  `} />

<CodeBlock title='Properties:' snippet={`
  export let style = null;
  export let showRight = false;
  export let showLeft = false
  `} />

<LibraryBlock title="Default:">
  <TwoSlot showLeft showRight outline rounded>
    <h2>Left</h2>

    <div slot='right'>
      <button>On the Right</button>
    </div>
  </TwoSlot>
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  <TwoSlot showLeft showRight >
    <h2>Left</h2>

    <div slot='right'>
      <button>On the Right</button>
    </div>
  </TwoSlot>
  `} />  

