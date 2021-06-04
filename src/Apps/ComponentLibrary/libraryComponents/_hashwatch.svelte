<script>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Link from '@base/Link'
  import HashWatch from '@core/HashWatch'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  let eventLog = []
  const events = {
    onChange: (val) => {
      hashWatchValue = val    
      eventLog = [...eventLog, {action: 'onChange', val}]
    }     
  }  

  const snippet = {
    name: 'HashWatch',
    importName: '@core/HashWatch.svelte'
  }

  $: livecode = `        
    <HashWatch onChange={(val) => {
      hashWatchValue = val      
    }} />     
     `  

  let hashWatchValue = null;

  const currentHash = '#components?page=library&component=hashwatch&section=rootcomponents'

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {events} {eventLog}>
  <div slot='liveexample'>    
    <HashWatch onChange={events.onChange} />    

    <p>Test Links:</p>
    <Link active type='primary' href={`${currentHash}&param1=foo`}>Foo</Link>
    <Link active type='success' href={`${currentHash}&param1=bar`}>Bar</Link>
    <Link active type='danger' href={`${currentHash}&param1=foobar`}>FooBar</Link> 
    <br>
    
    <p>Results:</p>
    {JSON.stringify(hashWatchValue, null, 4)}    
   </div>    
</LibrarySnippet>

