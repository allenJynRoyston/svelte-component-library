<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import Link from '@components/Link/Link.svelte'
</script>

<TwoSlot showLeft showRight>
  <h2>Link</h2>
  <div slot='right' style='display: flex: 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Link from '@components/Link/Link.svelte'
  `} />

<CodeBlock title='Properties:' snippet={
  `
  export let href: string|null = null;  
  export let onClick = null;
  export let text = null;
  
  export let active = false;
  export let inherit = false;  
  export let underline = false;
  export let fit = false;
  `} />

<LibraryBlock title='Default:' >
  <Link href='/' >I am a link</Link>
</LibraryBlock>

<CodeBlock title='Example' snippet={
  `
  <Link href='/' >I am a link</Link>
  `} />  

<LibraryBlock title='Type:' >
  <div style={`display: flex; gap: 10px`}>
  <Link type='primary' href='/' >Primary</Link>
  <Link type='primary' underline active href='/' >Primary</Link>
  
  <Link type='secondary' href='/' >Secondary</Link>
  <Link type='secondary' underline active href='/' >Secondary</Link>  

  <Link type='success' href='/' >Success</Link>
  <Link type='success' underline active href='/' >Success</Link>  
  
  <Link type='warning' href='/' >Warning</Link>
  <Link type='warning' underline active href='/' >Warning</Link>  
  
  <Link type='danger' href='/' >Danger</Link>
  <Link type='danger' underline active href='/' >Danger</Link>    
  

  <Link type='black' href='/' >Black</Link>
  <Link type='black' underline active href='/' >Black</Link>    
  
  <Link type='white' href='/' >White</Link>
  <Link type='white' underline active href='/' >White</Link>    
    
  </div>
</LibraryBlock>

<CodeBlock title='Example' snippet={
  `
  <Link href='/' >I am a link</Link>
  `} />    

<LibraryBlock title='Active:' >
  <Link active href='/' >I am a link</Link>
</LibraryBlock>

<CodeBlock title='Example' snippet={
  `
  <Link active href='/' >I am a link</Link>
  `} />    


<LibraryBlock title='Underline:' >
  <Link active underline href='/' >I am a link</Link>
</LibraryBlock>

<CodeBlock title='Example' snippet={
  `
  <Link active underline href='/' >I am a link</Link>
  `} />      

<LibraryBlock title='Fit:' >
  <h3>With Fit</h3>
  <div style='display: flex'>
    <Link fit href='/' >
      <Button>Button 1</Button>
    </Link>
    <Link fit href='/' >
      <Button type='secondary'>Button 2</Button>
    </Link>  
    <Link fit href='/' >
      <Button type='success'>Button 3</Button>
    </Link>      
  </div>
  <br><br>
  <h3>No Fit</h3>
  <div style='display: flex'>
    <Link href='/' >
      <Button>Button 1</Button>
    </Link>
    <Link href='/' >
      <Button type='secondary'>Button 2</Button>
    </Link>  
    <Link href='/' >
      <Button type='success'>Button 3</Button>
    </Link>      
  </div>  
</LibraryBlock>


<CodeBlock title='Example' snippet={
  `
  <div style='display: flex'>
    <Link fit href='/' >
      <Button>Button 1</Button>
    </Link>
    <Link fit href='/' >
      <Button type='secondary'>Button 2</Button>
    </Link>  
    <Link fit href='/' >
      <Button type='success'>Button 3</Button>
    </Link>      
  </div>
  `} />        