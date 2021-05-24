<script lang='ts'>
  import {getContext} from 'svelte'
  import ChannelButton from '@components/ChannelButton/ChannelButton.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
  import Select from '@components/FormComponents/Select/Select.svelte'
  
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'

  const theme:string = getContext('theme')

  const props = {
    label: 'Theme',    
    value: 0,
    exactfit: true,
    defaultOption: 'Select an option',
    options: [
      {id: 1, title: 'primary'},
      {id: 2, title: 'secondary'},
      {id: 3, title: 'magic'},
      {id: 4, title: 'success'},
      {id: 5, title: 'warning'},
      {id: 6, title: 'danger'},
      {id: 7, title: 'black'},
      {id: 8, title: 'white'}
    ],
    onInitFilter: (val, options) => {   
      return options.find(x => x.id === val)
    },
    onChangeFilter: (val) => {
      type = val.title
      return val && val.id
    },
  }  

  let showCode = false;
  let rounded = false;
  let type = null;
</script>

<TwoSlot showLeft showRight>
  <h2>Channel Button</h2>

  <div slot='right' style='display: flex; gap: 10px; align-items: center'>
    <Button exactfit type={theme === 'dark' ? 'white' : 'black'} size='small' rounded useToggle toggled={showCode} hollow={!showCode} nomargin onClick={() => {showCode = !showCode}} >Show Examples</Button>                  
  </div>
</TwoSlot>
<hr>



<CodeBlock show title='Import:' snippet={`
  import ChannelButton from '@components/ChannelButton/ChannelButton.svelte'
  `} />

<CodeBlock show title='Properties:' snippet={`
  export let onClick = () => {}
  export let leftIcon = null;
  export let rightIcon = null;
  export let content = null;
  export let iconSize = 18;
  export let rounded = false;
  `} />

<LibraryBlock flex title="Props: ">    
  <Button exactfit rounded type={theme === 'dark' ? 'white' : 'black'} size='small' useToggle toggled={rounded} hollow={!rounded} nomargin onClick={() => {rounded = !rounded}} >Rounded</Button>  
  <Select {...props} />  
</LibraryBlock>    

<LibraryBlock title="Default">
  <ChannelButton type={type} {rounded}>
    <h3>Check it out!</h3>
  </ChannelButton>
</LibraryBlock>

<CodeBlock show={showCode} open title='Example:' snippet={`
  <ChannelButton ${rounded ? 'rounded' : ''} ${!!type ? `type='${type}'` : ''}>
    <h3>Check it out!</h3>
  </ChannelButton>
  `} />  
