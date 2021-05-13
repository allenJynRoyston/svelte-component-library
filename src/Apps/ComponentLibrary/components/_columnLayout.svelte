<script>
  import ColumnLayout from '../../../components/Layout/ColumnLayout'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'

  const links = [
    {title: 'Link_1', href: '#' },    
    {title: 'Link_2', href: '#' },    
    {title: 'Link_3', href: '#' }   
  ]

</script>

<h2>GridLayout</h2>
<hr>


<LibraryBlock  >
  <div style='height: 300px'>
    <ColumnLayout {links} currentIndex={1} >
      <div style='padding: 0 10px'>
        <h3>I am content!</h3>
      </div>
    </ColumnLayout>
  </div>
</LibraryBlock>

<ThemeWrapper theme='dark'>
  <LibraryBlock title='Dark Theme:' >
    <div style='height: 300px'>
      <ColumnLayout {links} currentIndex={1} >
        <div style='padding: 0 10px'>
          <h3>I am content!</h3>
        </div>
      </ColumnLayout>
    </div>
  </LibraryBlock>
</ThemeWrapper>

<CodeBlock title='Properties:' snippet={`
  export let links = []
  export let currentIndex = null;
`} />

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

