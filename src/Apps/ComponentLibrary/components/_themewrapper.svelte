<script>
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'  
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'

  import ExampleBlock from './_example.svelte'

</script>

<h2>Splash</h2>
<hr>

<LibraryBlock title="Light:">
  <ThemeWrapper theme='light'>
    <ExampleBlock />

  </ThemeWrapper> 
</LibraryBlock>


<LibraryBlock title="Dark:">
  <ThemeWrapper theme='dark'>
    <ExampleBlock />

  </ThemeWrapper> 
</LibraryBlock>

<CodeBlock title='Properties:' snippet={`
`} />

<CodeBlock open title='Example:' snippet={`
`} />  




