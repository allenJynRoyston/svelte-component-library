<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'
  import InputTime from '@components/FormComponents/InputTime/InputTime.svelte'


  const theme:string = getContext('theme')

  const props = {
    label: 'Time',
      key: 'time',
      value: '09:00',
      minTime: '07:00',
      maxTime: '22:00',      
      required: true,
  }

</script>

<TwoSlot showLeft showRight>
  <h2>InputDate</h2>
  <div slot='right' style='display: flex; gap: 5px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  
  `} />

<CodeBlock title='Properties:' snippet={
  `
  export let onChange = null
  export let onKeypress = null
  export let updateForm = null;    
  
  export let placeholder = null
  export let value = ''
  export let key = null
  export let label = null;
  export let minTime = null;
  export let maxTime = null;    
  export let required = null;   
`} />

<LibraryBlock title="Default: ">   
  <InputTime {...props} />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`     

  <FileInput {...props} />
`} />  




<style lang='scss'>

</style>