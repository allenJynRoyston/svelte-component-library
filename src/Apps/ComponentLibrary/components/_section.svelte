<script lang='ts'>
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte';

  import Section from '@components/Section/Section.svelte'  
</script>

<h1>Section</h1>
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