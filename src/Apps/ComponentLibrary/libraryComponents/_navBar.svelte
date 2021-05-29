<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import NavBar from '@components/NavBar/NavBar.svelte'
  
  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const locationHash = `#components?page=library&component=navbar&section=components`

  const snippet = {
    name: 'NavBar',
    importName: '@components/NavBar/NavBar.svelte',
    inputs: [
      {forprop: 'watchHash', renderAs: 'input', componentprop: {type: 'text'}, value: null },
      {forprop: 'watchProp', renderAs: 'input', componentprop: {type: 'text'}, value: 'testprop' }
    ]
  }

  $: livecode = `    
      const props = {
        links: [
          {title: 'Home', active: true, icon: 'icon', href: \'${locationHash}&testprop=home\'},
          {title: 'About', icon: 'icon', href: \'${locationHash}&testprop=about\'},
          {title: 'Contact', icon: 'icon', href: \'${locationHash}&testprop=contact\'}
        ]    
      }

      <NavBar {...props} ${propstr}${selectstr}${inputstr} />
     `  

  const staticprops = {
    links: [
      {title: 'Home', active: true, icon: 'icon', href: `${locationHash}&testprop=home`},
      {title: 'About', icon: 'icon', href: `${locationHash}&testprop=about`},
      {title: 'Contact', icon: 'icon', href: `${locationHash}&testprop=contact`}
    ]    
  }

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <NavBar  {...staticprops} {...props} {...selectprops} {...inputprops} />
  </div>    
</LibrarySnippet>



