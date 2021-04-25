<script>
  import Link from '../../../components/Link/Link'
  import HashWatch from '../../../components/URLWatcher/HashWatch'
  import LibraryBlock from './__LibraryBlock'  

  let hashWatchValue = null;
</script>

<h2>HashWatch</h2>
<hr>

<LibraryBlock code section>
  <Link href='#library?component=hashwatch&param1=foo'>Foo</Link>
  <Link href='#library?component=hashwatch&param1=bar'>Bar</Link>
  <Link href='#library?component=hashwatch&param1=foo&param2=bar'>FooBar</Link> 

  <HashWatch onChange={(val) => {
    hashWatchValue = val      
  }} />

  <div slot='codeblock'>
    {JSON.stringify(hashWatchValue, null, 4)}      
  </div>
</LibraryBlock>


