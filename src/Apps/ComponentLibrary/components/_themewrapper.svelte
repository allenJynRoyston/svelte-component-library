<script>
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'  
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'

  import ExampleBlock from './_example.svelte'

</script>

<h2>Splash</h2>
<hr>

<LibraryBlock title="Light Theme:" >
  <ThemeWrapper theme='light' delay={1} lock>
    <ExampleBlock />
  </ThemeWrapper> 
</LibraryBlock>


<LibraryBlock title="Dark Theme:" >
  <ThemeWrapper theme='dark' delay={1} lock>
    <ExampleBlock />
  </ThemeWrapper> 
</LibraryBlock>

<CodeBlock title='Properties:' snippet={`
`} />

<CodeBlock open title='Example:' snippet={`
  <ThemeWrapper theme='light' lock delay={1}>
    <ExampleBlock />
  </ThemeWrapper> 
  
`} />  




