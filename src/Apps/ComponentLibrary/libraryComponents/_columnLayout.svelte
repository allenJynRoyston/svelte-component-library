<script>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import ColumnLayout from '@components/Layout/ColumnLayout'

  const links = [
    {title: 'Link_1', href: '#' },    
    {title: 'Link_2', href: '#' },    
    {title: 'Link_3', href: '#' }   
  ]


  const links2 = [
    {title: 'Link_1', href: '#' },    
    {title: 'Link_2', href: '#' },    
    {title: 'Link_3', href: '#' }   
  ]


</script>

<TwoSlot showLeft showRight>
  <h2>GridLayout</h2>
  <div slot='right' style='display: flex; gap 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import ColumnLayout from '@components/Layout/ColumnLayout'
  `} />

<CodeBlock title='Properties:' snippet={`
  export let links = []
  export let currentIndex = null;
  export let side = 'left'
  `} />

<LibraryBlock title='Default' >
  <div style='height: 300px'>
    <ColumnLayout {links} currentIndex={1} >
      <div style='padding: 0 10px'>
        <h3>I am content!</h3>
      </div>
    </ColumnLayout>
  </div>
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  const links = [
    {title: 'Header', href: '#header' },    
    {title: 'Footer', href: '#footer' },    
    {title: 'Button', href: '#button' }   
  ]

  <ColumnLayout {links} currentIndex={1} >
    <div style='padding: 0 10px'>
      <h3>I am content!</h3>
    </div>
  </ColumnLayout>
    `} />  

<LibraryBlock title='Right Side' >
  <div style='height: 300px'>
    <ColumnLayout links={links2} currentIndex={1} side='right' >
      <div style='padding: 0 10px'>
        <h3>I am content!</h3>
      </div>
    </ColumnLayout>
  </div>
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  const links = [
    {title: 'Header', href: '#header' },    
    {title: 'Footer', href: '#footer' },    
    {title: 'Button', href: '#button' }   
  ]

  <ColumnLayout {links} currentIndex={1} >
    <div style='padding: 0 10px'>
      <h3>I am content!</h3>
    </div>
  </ColumnLayout>
    `} />  

