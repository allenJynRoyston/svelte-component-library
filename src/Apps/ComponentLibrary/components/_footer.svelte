<script lant='ts'>
  import Footer from '../../../components/Footer/Footer.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'
</script>

<h2>Footer</h2>
<hr>

<ThemeWrapper theme='light' delay={1} lock>
  <LibraryBlock title="Light Theme:">
    <Footer >
      Made with ❤️ Allen Royston 2021
    </Footer>
  </LibraryBlock>
</ThemeWrapper>

<ThemeWrapper theme='dark' delay={1} lock>
  <LibraryBlock title="Dark Theme:">
    <Footer >
      Made with ❤️ Allen Royston 2021
    </Footer>
  </LibraryBlock>
</ThemeWrapper>


<CodeBlock title='Properties:' snippet={
  `
  `} />

<CodeBlock open title='Example:' snippet={`
  <Footer >
    Made with ❤️ Allen Royston 2021
  </Footer>
  `} />  

