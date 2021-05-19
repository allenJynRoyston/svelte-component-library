<script>
  import ColumnLayout from '@components/Layout/ColumnLayout'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

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

<h2>GridLayout</h2>
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

