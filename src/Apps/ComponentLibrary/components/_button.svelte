<script>
  import Button from '../../../components/Button/Button'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'
  
  const onClick = () => {
    console.log('do something')
  }

</script>

<h2>Button</h2>
<hr>

<LibraryBlock title="Default:">
  <Button >
    Click Me!
  </Button>
</LibraryBlock>

<ThemeWrapper theme='dark'>
  <LibraryBlock title="Default:">    
      <Button >
        Click Me!
      </Button>    
  </LibraryBlock>
</ThemeWrapper>

<CodeBlock title='Properties:' snippet={
  `
  export let onClick = null
  export let disabled = false
  export let style = null
  export let role = 'button'
  export let dataTestid = null
  export let text = null

  export let type = 'primary';
  export let href = null;
  export let rounded = false;
  export let size = 'normal'
  
  `} />

<CodeBlock open title='Example:' snippet={`
  <Button >
    Click Me!
  </Button>
  `} />  




