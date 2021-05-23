<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'
  import Rating from '@components/FormComponents/Rating/Rating.svelte'


  const theme:string = getContext('theme')

  const props = {
    type: 'success',
    label: 'Ratings',
    key: 'rating',      
    value: 2,                
    required: true,
    maxLength: 10,  
    slots: {
      selected: 'star-full',
      notSelected: 'star-empty'
    }
  }

</script>

<TwoSlot showLeft showRight>
  <h2>Rating</h2>
  <div slot='right' style='display: flex; gap: 5px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  export let onChange = null
  export let onKeypress = null
  export let updateForm = null;    

  export let type = null;  
  export let placeholder = null
  export let value = 0
  export let key = null
  export let label = null;
  export let required = null;
  export let maxLength = 5;  
  export let slots = null 
  `} />

<CodeBlock title='Properties:' snippet={
  `
  export let onChange = null
  export let onKeypress = null
  export let updateForm = null;    

  export let type = null  
  export let placeholder = null
  export let value = 0
  export let key = null
  export let label = null;
  export let required = null;
  export let maxLength = 5;  
  export let slots = null 
  export let fixedWidth = 'auto';  
`} />

<LibraryBlock title="Default: ">   
  <Rating {...props} />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={
`     
  const props = {
    type: 'success',
    label: 'Ratings',
    key: 'rating',      
    value: 2,                
    required: true,
    maxLength: 10,  
    slots: {
      selected: 'star-full',
      notSelected: 'star-empty'
    }
  }

  <Rating {...props} />
`} />  




<style lang='scss'>

</style>