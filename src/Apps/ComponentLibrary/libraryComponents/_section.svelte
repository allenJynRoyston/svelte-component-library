<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'
  import Section from '@components/Section/Section.svelte'  
</script>

<TwoSlot showLeft showRight>
  <h2>Section</h2>
  <div slot='right' style='display: flex; gap 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Section from '@components/Section/Section.svelte'  
  `} />

<CodeBlock title='Properties:' snippet={
  `
  export let outline = false;
  export let className = null;
  export let style = null;
  `} />

<LibraryBlock title="Default">
  <Section >
    <h1>I render content with a consistent padding that shrinks on mobile to fit better.</h1>
    <LoremBlock />
  </Section>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Section >
    <h1>I render content with a consistent padding that shrinks on mobile to fit better.</h1>
    <LoremBlock />
  </Section>
  `} />  


<LibraryBlock title="Outline">
  <Section outline>
    <h1>I render content with a consistent padding that shrinks on mobile to fit better.</h1>
    <LoremBlock />
  </Section>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Section outline >
    ...
  </Section>
  `} />  