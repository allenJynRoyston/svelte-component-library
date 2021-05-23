<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'
  import FileInput from '@components/FormComponents/FileInput/FileInput.svelte'


  const theme:string = getContext('theme')

  const props = {

  }

</script>

<TwoSlot showLeft showRight>
  <h2>Input</h2>
  <div slot='right' style='display: flex; gap: 5px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  
  `} />

<CodeBlock title='Properties:' snippet={
  `
`} />

<LibraryBlock title="Default: ">   
  <FileInput {...props} />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`     

  <FileInput {...props} />
`} />  




<style lang='scss'>

</style>