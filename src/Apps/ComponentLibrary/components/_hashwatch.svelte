<script>
  import Link from '../../../components/Link/Link'
  import HashWatch from '../../../components/URLWatcher/HashWatch'
  import LibraryBlock from './__LibraryBlock'  
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

  let hashWatchValue = null;
</script>

<h2>HashWatch</h2>
<hr>

<Link href='#library?component=hashwatch&param1=foo'>Foo</Link>
<Link href='#library?component=hashwatch&param1=bar'>Bar</Link>
<Link href='#library?component=hashwatch&param1=foo&param2=bar'>FooBar</Link> 
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

  <HashWatch onChange={(val) => {
    hashWatchValue = val      
  }} />

  {JSON.stringify(hashWatchValue, null, 4)}     
  `} />  

{JSON.stringify(hashWatchValue, null, 4)}      
