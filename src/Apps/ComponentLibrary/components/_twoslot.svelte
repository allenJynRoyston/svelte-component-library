<script lang='ts'>
  import TwoSlot from '../../../components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'
</script>

<h1>ThreeSlot</h1>
<hr>

<LibraryBlock title="Default:">
  <TwoSlot showLeft showRight outline rounded>
    <h2>Left</h2>

    <div slot='right'>
      <button>On the Right</button>
    </div>
  </TwoSlot>
</LibraryBlock>

<ThemeWrapper theme='dark' delay={1}>
  <LibraryBlock title="Dark Theme:">
    <TwoSlot showLeft showRight outline rounded>
      <h2>Left</h2>
  
      <div slot='right'>
        <button>On the Right</button>
      </div>
    </TwoSlot>
  </LibraryBlock>
</ThemeWrapper>

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

