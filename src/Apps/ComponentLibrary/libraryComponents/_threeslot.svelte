<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import ThreeSlot from '@components/ThreeSlot/ThreeSlot.svelte'

</script>

<TwoSlot showLeft showRight>
  <h2>ThreeSlot</h2>
  <div slot='right' style='display: flex; gap 10px'>
  </div>
</TwoSlot>
<hr>


<CodeBlock open title='Import:' snippet={`
  import ThreeSlot from '@components/ThreeSlot/ThreeSlot.svelte'
  `} />

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


