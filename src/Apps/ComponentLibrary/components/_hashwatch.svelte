<script>
  import Link from '@components/Link/Link'
  import HashWatch from '@components/URLWatcher/HashWatch'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  let hashWatchValue = null;

  const currentHash = '#components?page=library&component=hashwatch'

</script>

<h2>HashWatch</h2>
<hr>

<CodeBlock open title='Import:' snippet={`
  import HashWatch from '@components/URLWatcher/HashWatch'
  `} />

<Link href={`${currentHash}&param1=foo`}>Foo</Link>
<Link href={`${currentHash}&param1=bar`}>Bar</Link>
<Link href={`${currentHash}&param1=foobar`}>FooBar</Link> 
<hr>

<HashWatch onChange={(val) => {
  hashWatchValue = val      
}} />

<CodeBlock title='Properties:' snippet={
  `
  export let onChange;
  `} />

<CodeBlock open title='Example:' snippet={`
  let hashWatchValue = null;
  const hashWatch = ({hash, params}) => {
    hashWatchValue = params?.paramName || null;
  }

  <HashWatch onChange={hashWatch} />

  {JSON.stringify(hashWatchValue, null, 4)}     
  `} />  

{JSON.stringify(hashWatchValue, null, 4)}      
