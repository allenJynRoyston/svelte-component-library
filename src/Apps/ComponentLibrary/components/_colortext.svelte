<script lang='ts'>  
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import ColorText from '@components/ColorText/ColorText.svelte';
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'
</script>

<h2>ColorText</h2>
<hr>

<CodeBlock open title='Import:' snippet={`
  import ColorText from '@components/ColorText/ColorText.svelte';
  `} />

<CodeBlock title='Properties:' snippet={`
  export let type = 'primary'
  `} />

<LibraryBlock title="Default:">
  <ColorText type='primary'>
    <h1>Primary</h1>
    <LoremBlock />
  </ColorText>

  <ColorText type='secondary'>
    <h1>Secondary</h1>
    <LoremBlock />
  </ColorText>  

  <ColorText type='magic'>
    <h1>Magic</h1>
    <LoremBlock />
  </ColorText>  
  
  <ColorText type='success'>
    <h1>Success</h1>
    <LoremBlock />
  </ColorText>  
  
  <ColorText type='warning'>
    <h1>Warning</h1>
    <LoremBlock />
  </ColorText>   
  
  <ColorText type='danger'>
    <h1>Danger</h1>
    <LoremBlock />
  </ColorText>     
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  // import
  import ColorText from '@components/ColorText/ColorText.svelte';

  // html
  <ColorText type='primary'>
    <h1>Content</h1>
  </ColorText>  
    `} />  

