<script>
  import LibraryBlock from '../../ComponentLibrary/components/LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

  import LocalStorageWatch from '../../../components-db/LocalStorageWatch.svelte'

  window.localStorage.setItem('test', JSON.stringify({name: 'asdf', age: 32}))

  let testData = null;
  const onFetch = ({success, data}) => {
    testData = success ? data : null;
  }

</script>

<h2>Local/Session Storage Watch</h2>
<hr>

<LocalStorageWatch key='test' {onFetch} />

<CodeBlock title='Properties:' snippet={`
  export let key = null;
  export let type: 'localStorage' | 'sessionStorage' = 'localStorage'
  export let onFetch;
`} />

<CodeBlock open title='Example:' snippet={`
  //   window.localStorage.setItem('test', JSON.stringify({name: 'allen', age: 32}))


  let testData = null;
  const onFetch = ({success, data}) => {
    testData = success ? data : null;
  }

  <LocalStorageWatch key='login' {onFetch} />

`} />  


<LibraryBlock title="Output:">
  <h5>testData:</h5>
  {JSON.stringify(testData, null, 4)}     
 
</LibraryBlock>


