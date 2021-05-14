<script lang='ts'>
  import ThreeSlot from '../../../components/ThreeSlot/ThreeSlot.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
</script>

<h1>ThreeSlot</h1>
<hr>

<CodeBlock title='Properties:' snippet={`
  export let style = null;
  export let showLeft = false;
  export let showRight = false;
  export let showCenter = false;
  `} />

<LibraryBlock title="Default:">
  <ThreeSlot showLeft showRight outline rounded >
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



<CodeBlock open title='Example:' snippet={`
    <ThreeSlot showLeft showRight outline rounded >
      <div slot='left'>
        <h2>Left</h2>
      </div>
  
      <div style='text-align: center'>
        <p>Content that is placed inbetween.</p>
      </div>
      
      <div slot='right'>
        <Button>Right</Button>
      </div>
    </ThreeSlot>
`} />  


