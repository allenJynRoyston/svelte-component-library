<script lang='ts'>
  import Accordian from '../../../components/Accordion/Accordion.svelte'
  import LoremBlock from '../../../components/LoremBlock/LoremBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'

</script>

<h2>Accordion</h2>
<hr>

<ThemeWrapper theme='light'>
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
</ThemeWrapper>

<ThemeWrapper theme='dark' delay={1}>
  <LibraryBlock title='Dark theme:'>
    <Accordian rounded outline>
      <div slot='title'>
        <h3>Accordion</h3>
      </div>
    
      <div slot='content'>
        <LoremBlock />
      </div>
    </Accordian>
  </LibraryBlock>
</ThemeWrapper>


<CodeBlock title='Properties:' snippet={
  `
  export let open = false
  export let fill = false
  `} />

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

  