<script lang='ts'>
  import Accordian from '../../../components/Accordion/Accordion.svelte'
  import LoremBlock from '../../../components/LoremBlock/LoremBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'

</script>

<h2>Accordion</h2>
<hr>

<CodeBlock  title='Properties:' snippet={
  `
  export let open = false
  export let fill = false

`} />


<LibraryBlock title='Default:'>
  <Accordian rounded outline>
    <div slot='title'>
      <h3>Accordion</h3>
    </div>

    <div slot='content'>
      <LoremBlock />
    </div>
  </Accordian>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Accordian rounded outline>
    <div slot='title'>
      <h3>Accordion</h3>
    </div>
  
    <div slot='content'>
      <LoremBlock />
    </div>
  </Accordian>

`} />  

  