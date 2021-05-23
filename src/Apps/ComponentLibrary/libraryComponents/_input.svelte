<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'
  import Input from '@components/FormComponents/Input/Input.svelte'


  const theme:string = getContext('theme')

  const props = {
    label: 'Input',
    placeholder: 'Placeholder...',
    required: true
  }

</script>

<TwoSlot showLeft showRight>
  <h2>Input</h2>
  <div slot='right' style='display: flex; gap: 5px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Input from '@components/FormComponents/Input/Input.svelte'
  `} />

<CodeBlock title='Properties:' snippet={
  `
  export let onChange = null
  export let onKeypress = null
  export let updateForm = null;    

  export let type = null  
  export let placeholder = null
  export let value = ''
  export let noBottomMargin = false
  export let key = null
  export let label = null;
  export let regex = null;
  export let required = null;
  export let allowShowToggle = true;  
  export let minLength = null;
  export let maxLength = null;
  export let hasSubmitted = false;  
`} />

<LibraryBlock title="Default: ">   
  <Input {...props} />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`     
  const props = {
    label: 'Input',
    placeholder: 'Placeholder...',
    required: true
  }

  <Input {...props} />
`} />  




<style lang='scss'>

</style>