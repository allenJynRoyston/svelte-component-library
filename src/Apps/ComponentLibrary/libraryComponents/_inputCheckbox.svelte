<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'
  import InputCheckbox from '@components/FormComponents/InputCheckbox/InputCheckbox.svelte'


  const theme:string = getContext('theme')

  const props = {
    label: 'Agree',
    key: 'agree',
    text: 'Do you agree to the terms and agreements?',
    value: true,
    required: true     
  }

</script>

<TwoSlot showLeft showRight>
  <h2>InputCheckbox</h2>
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
  <InputCheckbox {...props} />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`     

  <FileInput {...props} />
`} />  




<style lang='scss'>

</style>