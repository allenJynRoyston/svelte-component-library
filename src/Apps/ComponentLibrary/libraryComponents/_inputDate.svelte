<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'
  import InputDate from '@components/FormComponents/InputDate/InputDate.svelte'


  const theme:string = getContext('theme')

  const props = {
    label: 'Date',
    key: 'date',
    value: '12-01-1982',
    minDate: '01-01-1950',
    maxDate: '01-01-2020',      
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
  export let minDate = null;
  export let maxDate = null;    
  export let required = null;
`} />

<LibraryBlock title="Default: ">   
  <InputDate {...props} />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`     

  <FileInput {...props} />
`} />  




<style lang='scss'>

</style>