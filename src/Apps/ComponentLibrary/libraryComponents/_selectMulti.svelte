<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'
  import SelectMulti from '@components/FormComponents/SelectMulti/SelectMulti.svelte'


  const theme:string = getContext('theme')

  const props = {
    type: 'checkbox',
    label: 'Multi Select',
    key: 'selectmulti',      
    value: [1, 3],      
    options: [
      {id: 1, title: 'option 1'},
      {id: 2, title: 'option 2'},
      {id: 3, title: 'option 3'},
      {id: 4, title: 'option 4'}
    ],
    onInitFilter: (arr, options) => {  
      return options.map((x) => {
        arr.forEach(v => {
          x._selected = !x._selected ? (x.id === v) : x._selected
        })
        return x
      })
    },
    onChangeFilter: (arr) => {           
      return arr.map(x => {
        return x.id
      })
    },
    required: true    
  }

</script>

<TwoSlot showLeft showRight>
  <h2>SelectMulti</h2>
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
  <SelectMulti {...props} />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={
  `     
  <SelectMulti {...props} />
  `} />  




<style lang='scss'>

</style>