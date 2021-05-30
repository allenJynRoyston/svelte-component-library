<script>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Link from '@components/Link/Link'
  import HashWatch from '@components/URLWatcher/HashWatch'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'HashWatch',
    importName: '@components/HashWatch/HashWatch.svelte'
  }

  $: livecode = `        
    <HashWatch onChange={(val) => {
      hashWatchValue = val      
    }} />     
     `  

  let hashWatchValue = null;

  const currentHash = '#components?page=library&component=hashwatch&section=rootcomponents'

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <HashWatch onChange={(val) => {
      hashWatchValue = val      
    }} />    

    <p>Test Links:</p>
    <Link active type='primary' href={`${currentHash}&param1=foo`}>Foo</Link>
    <Link active type='success' href={`${currentHash}&param1=bar`}>Bar</Link>
    <Link active type='danger' href={`${currentHash}&param1=foobar`}>FooBar</Link> 
    <br>
    
    <p>Results:</p>
    {JSON.stringify(hashWatchValue, null, 4)}    
   </div>    
</LibrarySnippet>

