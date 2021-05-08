<script>
  import TwoSlot from '../../../components/TwoSlot/TwoSlot'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

</script>

<h1>ThreeSlot</h1>
<hr>

<LibraryBlock title="Live:">
  <TwoSlot showLeft showRight >
    <h2>Left</h2>

    <div slot='right'>
      <button>On the Right</button>
    </div>
  </TwoSlot>
</LibraryBlock>

<CodeBlock title='Properties:' snippet={`
  export let style = null;
  export let showRight = false;
  export let showLeft = false
`} />

<CodeBlock open title='Example:' snippet={`
  <TwoSlot showLeft showRight >
    <h2>Left</h2>

    <div slot='right'>
      <button>On the Right</button>
    </div>
  </TwoSlot>
`} />  

