<script>
  import Button from '../../../components/Button/Button'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

  const onClick = () => {
    console.log('do something')
  }

</script>

<h2>Button</h2>
<hr>

<LibraryBlock title="Live:">
  <Button >
    Click Me!
  </Button>
</LibraryBlock>

<CodeBlock title='Properties:' snippet={
  `
  export let onClick = null
  export let disabled = false
  export let style = null
  export let role = 'button'
  export let dataTestid = null
  export let text = null  
  `} />

<CodeBlock open title='Example:' snippet={`
  <Button >
    Click Me!
  </Button>
  `} />  




