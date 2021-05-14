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
  export let rounded = false;
  export let outline = false;
  `} />


<LibraryBlock title='Default:'>
  <Accordian>
    <div slot='title'>
      <h3>Accordion</h3>
    </div>

    <div slot='content'>
      <LoremBlock />
    </div>
  </Accordian>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Accordian>
    <div slot='title'>
      <h3>Accordion</h3>
    </div>
  
    <div slot='content'>
      <LoremBlock />
    </div>
  </Accordian>
  `} />  


<LibraryBlock title='Outline:'>
  <Accordian outline>
    <div slot='title'>
      <h3>Accordion</h3>
    </div>

    <div slot='content'>
      <LoremBlock />
    </div>
  </Accordian>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Accordian outline>
    ...
  </Accordian>
  `} />  


<LibraryBlock title='Rounded:'>
  <Accordian outline rounded>
    <div slot='title'>
      <h3>Accordion</h3>
    </div>

    <div slot='content'>
      <LoremBlock />
    </div>
  </Accordian>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Accordian outline rounded>
    ...
  </Accordian>
  `} />  


  