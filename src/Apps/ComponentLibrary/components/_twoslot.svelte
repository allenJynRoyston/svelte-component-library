<script lang='ts'>
  import TwoSlot from '../../../components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
</script>

<h1>ThreeSlot</h1>
<hr>

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

