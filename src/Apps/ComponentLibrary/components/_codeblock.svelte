<script lang='ts'>  
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  const theme:string = getContext('theme')


</script>

<TwoSlot showLeft showRight>
  <h2>CodeBlock</h2>
  <div slot='right' style='display: flex: 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
  `} />

<CodeBlock title='Properties:' snippet={`
  export let title = null;
  export let open = false;
  export let snippet = '';     
  export let lang = 'typescript'
  `} />

<LibraryBlock title="Default:">
  <CodeBlock open title='Example:' snippet={`
    const greeting = "hello world"
    <h1>{greeting}<h1>
  `} />  
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <CodeBlock open title='Example:' snippet={'
    const greeting = "hello world"
    <h1>{greeting}<h1>
  '} />  
  `} />  

