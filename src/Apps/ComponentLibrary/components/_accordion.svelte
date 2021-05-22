<script lang='ts'>
  import {getContext} from 'svelte'

  import Accordian from '@components/Accordion/Accordion.svelte'
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import Button from '@components/Button/Button.svelte'

  let rounded = false;
  let outline = true;

  const theme:string = getContext('theme')

</script>

<TwoSlot showLeft showRight>
  <h2>Accordion</h2>
  <div slot='right' style='display: flex: 10px'>
    <Button  type={theme === 'dark' ? 'white' : 'black'} rounded useToggle toggled={rounded} hollow={!rounded} exactfit onClick={() => {rounded = !rounded}} >Rounded</Button>
    <Button  type={theme === 'dark' ? 'white' : 'black'} rounded useToggle toggled={outline} hollow={!outline} exactfit onClick={() => {outline = !outline}} >Outline</Button>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Accordian from '@components/Accordion/Accordion.svelte'
  `} />


<CodeBlock open title='Properties:' snippet={
  `
  export let open = false
  export let fill = false
  export let rounded = false;
  export let outline = false;
  `} />


<LibraryBlock title='Default:'>
  <Accordian {rounded} {outline}>
    <div slot='title'>
      <h3>Accordion</h3>
    </div>

    <div slot='content'>
      <LoremBlock />
    </div>
  </Accordian>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Accordian ${rounded ? 'rounded' : ''} ${outline ? 'outline' : ''}>
    <div slot='title'>
      <h3>Accordion</h3>
    </div>
  
    <div slot='content'>
      <LoremBlock />
    </div>
  </Accordian>
  `} />  


  