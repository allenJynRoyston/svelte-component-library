<script lang='ts'>
  import Container from '../../../components/Container/Container.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'

</script>

<h2>Container</h2>
<hr>

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
