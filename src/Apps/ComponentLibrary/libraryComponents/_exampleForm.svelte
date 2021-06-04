<script lang='ts'>
  import {getContext} from 'svelte'
  import TwoSlot from '@base/TwoSlot.svelte'
  import CodeBlock from '@base/CodeBlock.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'
  import ExampleForm from '@examples/FormExample.svelte'

  const theme:string = getContext('theme')

</script>

<TwoSlot>
  <h2 slot='left'>Example Form</h2>
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
  <ExampleForm />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`       
`} />  




<style lang='scss'>

</style>