<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import Loader from '@components/Loader/Loader'

  const theme:string = getContext('theme')

  let rounded = false;
  let skinny = false;
</script>

<TwoSlot showLeft showRight>
  <h2>Loader</h2>
  <div slot='right' style='display: flex; gap: 5px'>
    <Button  type={theme === 'dark' ? 'white' : 'black'} rounded useToggle toggled={rounded} hollow={!rounded} nomargin onClick={() => {rounded = !rounded}} >Rounded</Button>
    <Button  type={theme === 'dark' ? 'white' : 'black'} rounded useToggle toggled={skinny} hollow={!skinny} nomargin onClick={() => {skinny = !skinny}} >Skinny</Button>  
  </div>
</TwoSlot>
<hr>
<CodeBlock open title='Import:' snippet={`
  import Loader from '@components/Loader/Loader'
  `} />

<CodeBlock title='Properties:' snippet={
  `
  export let show = false
  export let rounded = false;
  `} />

<LibraryBlock title="Default:">
    <Loader show {skinny} {rounded} />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Loader show ${skinny ? 'skinny' : ''} ${rounded ? 'rounded' : ''}/>
  `} />  


<LibraryBlock title="Type:">
  <Loader show type='secondary' {skinny} {rounded} />
  <Loader show type='magic'{skinny} {rounded} />
  <Loader show type='success' {skinny} {rounded} />
  <Loader show type='warning'{skinny} {rounded} />
  <Loader show type='danger'{skinny} {rounded} />
  <Loader show type='black'{skinny} {rounded} />
  <Loader show type='white'{skinny} {rounded} />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Loader show type='secondary' ${skinny ? 'skinny' : ''} ${rounded ? 'rounded' : ''}/>
  <Loader show type='magic' ${skinny ? 'skinny' : ''} ${rounded ? 'rounded' : ''}/>
  <Loader show type='success' ${skinny ? 'skinny' : ''} ${rounded ? 'rounded' : ''}/>
  <Loader show type='warning' ${skinny ? 'skinny' : ''} ${rounded ? 'rounded' : ''}/>
  <Loader show type='danger' ${skinny ? 'skinny' : ''} ${rounded ? 'rounded' : ''}/>
  <Loader show type='black' ${skinny ? 'skinny' : ''} ${rounded ? 'rounded' : ''}/>
  <Loader show type='white' ${skinny ? 'skinny' : ''} ${rounded ? 'rounded' : ''}/>
`} />  



