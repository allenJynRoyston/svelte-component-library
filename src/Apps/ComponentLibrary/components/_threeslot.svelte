<script>
  import ThreeSlot from '../../../components/ThreeSlot/ThreeSlot'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

</script>

<h1>ThreeSlot</h1>
<hr>

<LibraryBlock title="Live:">
  <ThreeSlot showLeft showRight >
    <div slot='left'>
      <h2>Left</h2>
    </div>

    <div style='text-align: center'>
      <p>Content that is placed inbetween.</p>
    </div>
    
    <div slot='right'>
      <button>Right</button>
    </div>
  </ThreeSlot>
</LibraryBlock>

<CodeBlock title='Properties:' snippet={`
  export let style = null;
  export let showLeft = false;
  export let showRight = false;
  export let showCenter = false;
`} />

<CodeBlock open title='Example:' snippet={`
  <ThreeSlot showLeft showRight >
    <div slot='left'>
      <h2>Left</h2>
    </div>

    <div style='text-align: center'>
      <p>Content that is placed inbetween.</p>
    </div>
    
    <div slot='right'>
      <button>Right</button>
    </div>
  </ThreeSlot>
`} />  


