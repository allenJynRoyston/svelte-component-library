<script lang='ts'>
  import {getContext} from 'svelte'
  import ChannelButton from '@components/ChannelButton/ChannelButton.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
  
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'

  const theme:string = getContext('theme')

  let rounded = false;
</script>

<TwoSlot showLeft showRight>
  <h2>Channel Button</h2>
  <div slot='right' style='display: flex: 10px'>
    <Button rounded type={theme === 'dark' ? 'white' : 'black'} useToggle toggled={rounded} hollow={!rounded} exactfit onClick={() => {rounded = !rounded}} >Rounded</Button>
  </div>
</TwoSlot>
<hr>



<CodeBlock open title='Import:' snippet={`
  import ChannelButton from '@components/ChannelButton/ChannelButton.svelte'
  `} />

<CodeBlock title='Properties:' snippet={`
  export let onClick = () => {}
  export let leftIcon = null;
  export let rightIcon = null;
  export let content = null;
  export let iconSize = 18;
  export let rounded = false;
  `} />

<LibraryBlock title="Default">
  <ChannelButton  {rounded}>
    <h3>Check it out!</h3>
  </ChannelButton>
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  <ChannelButton  >
    <h3>Check it out!</h3>
  </ChannelButton>
  `} />  

<LibraryBlock title="Default">
  <ChannelButton type='primary' {rounded}>
    <h3>Primary</h3>
  </ChannelButton>
  <ChannelButton type='secondary'{rounded}>
    <h3>Secondary</h3>
  </ChannelButton>
  <ChannelButton type='magic'{rounded}>
    <h3>Magic</h3>
  </ChannelButton>
  <ChannelButton type='success'{rounded}>
    <h3>Success</h3>
  </ChannelButton>
  <ChannelButton type='warning'{rounded}>
    <h3>Warning</h3>
  </ChannelButton>      
  <ChannelButton type='danger'{rounded}>
    <h3>Danger</h3>
  </ChannelButton>        
  <ChannelButton type='black'{rounded}>
    <h3>Black</h3>
  </ChannelButton>          
  <ChannelButton type='white'{rounded}>
    <h3>White</h3>
  </ChannelButton>            
</LibraryBlock>



<CodeBlock open title='Example:' snippet={`
  <ChannelButton type='primary'>
    <h3>Primary</h3>
  </ChannelButton>
  <ChannelButton type='secondary'>
    <h3>Secondary</h3>
  </ChannelButton>
  <ChannelButton type='magic'>
    <h3>Magic</h3>
  </ChannelButton>
  <ChannelButton type='success'>
    <h3>Success</h3>
  </ChannelButton>
  <ChannelButton type='warning'>
    <h3>Warning</h3>
  </ChannelButton>      
  <ChannelButton type='danger'>
    <h3>Danger</h3>
  </ChannelButton>        
  <ChannelButton type='black'>
    <h3>Black</h3>
  </ChannelButton>          
  <ChannelButton type='white'>
    <h3>White</h3>
  `} />  