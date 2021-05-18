<script>
  import Loader from '@components/Loader/Loader'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

</script>

<h1>Loader</h1>
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
    <Loader show/>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Loader show />
  `} />  


<LibraryBlock title="Type:">
  <Loader show type='secondary'/>
  <Loader show type='magic' />
  <Loader show type='success'/>
  <Loader show type='warning'/>
  <Loader show type='danger'/>
  <Loader show type='black'/>
  <Loader show type='white'/>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Loader show type='secondary'/>
  <Loader show type='magic' />
  <Loader show type='success'/>
  <Loader show type='warning'/>
  <Loader show type='danger'/>
  <Loader show type='black'/>
  <Loader show type='white'/>
`} />  




<LibraryBlock title="Rounded:">
  <Loader show rounded />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  <Loader show rounded />
  `} />  

<LibraryBlock title="Skinny:">
  <Loader show skinny />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  <Loader show skinny />
  `} />    