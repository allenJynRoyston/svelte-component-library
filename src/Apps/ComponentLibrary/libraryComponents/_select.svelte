<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'
  import Select from '@components/FormComponents/Select/Select.svelte'


  const theme:string = getContext('theme')

  const props = {
    label: 'Select',
    key: 'select',      
    value: 2,
    defaultOption: 'Select an option',
    options: [
      {id: 1, title: 'option 1'},
      {id: 2, title: 'option 2'},
      {id: 3, title: 'option 3'},
      {id: 4, title: 'option 4'}
    ],
    onInitFilter: (val, options) => {   
      return options.find(x => x.id === val)
    },
    onChangeFilter: (val) => {
      return val && val.id
    },
    required: true
  }

</script>

<TwoSlot showLeft showRight>
  <h2>Select</h2>
  <div slot='right' style='display: flex; gap: 5px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={
  `
  `} />

<CodeBlock title='Properties:' snippet={
  `
  `} />

<LibraryBlock title="Default: ">   
  <Select {...props} />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={
  `     
  <Select {...props} />
  `} />  




<style lang='scss'>

</style>