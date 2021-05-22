<script lant='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import Footer from '@components/Footer/Footer.svelte'
</script>

<TwoSlot showLeft showRight>
  <h2>Footer</h2>
  <div slot='right' style='display: flex: 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Footer from '@components/Footer/Footer.svelte'
  `} />

<CodeBlock title='Properties:' snippet={
  `
  `} />

<LibraryBlock title="Light Theme:">
  <Footer >
    Made with ❤️ Allen Royston 2021
  </Footer>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Footer >
    Made with ❤️ Allen Royston 2021
  </Footer>
  `} />  

