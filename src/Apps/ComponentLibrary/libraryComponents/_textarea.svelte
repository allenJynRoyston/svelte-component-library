<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'
  import TextArea from '@components/FormComponents/Textarea/Textarea.svelte'


  const theme:string = getContext('theme')

  const props = {
    label: 'Description',
    key: 'description',      
    value: 'blah blah blah blah',
    required: true,
    contentEdit: true,
    minLength: 5
  }

</script>

<TwoSlot showLeft showRight>
  <h2>Textarea</h2>
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
  export let regex = null;
  export let required = null; 
  export let minLength = null;  
  export let maxLength = null;
  export let contentEdit = false
  export let hasSubmitted = false    
`} />

<LibraryBlock title="Default: ">   
  <TextArea {...props} />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`     

  <FileInput {...props} />
`} />  




<style lang='scss'>

</style>