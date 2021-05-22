<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import Container from '@components/Container/Container.svelte'
</script>

<TwoSlot showLeft showRight>
  <h2>GridLayout</h2>
  <div slot='right' style='display: flex: 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Container from '@components/Container/Container.svelte'
  `} />

<CodeBlock  title='Properties:' snippet={
  `
  export let offset = 0;

  `} />


<LibraryBlock title='Default:'>
  <Container>
    <div style='padding: 20px'>
      <h1>I am a header.</h1>
      <p>
        This container will automatically wrap the contents and apply the correct theme to the body content.
      </p>    
    <div style='padding: 20px'>
  </Container>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Container>
    <div style='padding: 20px'>
      <h1>I am a header.</h1>
      <p>
        This container will automatically wrap the contents and apply the correct theme to the body content.
      </p>    
    <div style='padding: 20px'>   
  </Container>
  `} />  

  
<LibraryBlock title='Offset:'>
  <Container offset={4}>
    <div style='padding: 20px'>
      <h1>Offset will alter the theme gradient.</h1>
      <p>
        An offset of 4 will darken by 4 levels of gradient.
      </p>    
    </div>
  </Container>
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  <Container offset={4}>
    <div style='padding: 20px'>
      <h1>Offset will alter the theme gradient.</h1>
      <p>
        An offset of 4 will darken by 4 levels of gradient.
      </p>    
    </div>  
  </Container>
  `} />  
