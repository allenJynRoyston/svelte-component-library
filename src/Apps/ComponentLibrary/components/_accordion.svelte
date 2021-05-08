<script>
  import LibraryBlock from './__LibraryBlock'
  import Accordian from '../../../components/Accordion/Accordion.svelte'
  import LoremBlock from '../../../components/LoremBlock/LoremBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

</script>

<h2>Accordion</h2>
<hr>

<Accordian >
  <div slot='title'>
    <h3>Accordion</h3>
  </div>

  <div slot='content'>
    Hello World!
  </div>
</Accordian>

<CodeBlock title='Properties:' snippet={
  `
  export let open = false
  export let fill = false
  `} />

<CodeBlock open title='Example:' snippet={`
  <Accordian >
    <div slot='title'>
      <h3>Accordion with Overflow</h3>
    </div>

    <div slot='content'>
      <LoremBlock />
    </div>
  </Accordian>
`} />  

  