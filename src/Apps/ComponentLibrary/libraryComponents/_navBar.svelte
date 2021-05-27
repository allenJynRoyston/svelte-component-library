<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import NavBar from '@components/NavBar/NavBar.svelte'
  
  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'NavBar',
    importName: '@components/NavBar/NavBar.svelte',
    properties: `
    export let links = []
    export let watchHash = null;
    export let watchProp = null;
    `
  }

  $: livecode = `    
    <div style='width: 100px'>
      <NavBar  ${propstr}${selectstr}${inputstr} />
    </div>
     `  

  const staticprops = {
    watchProp: 'link',
    links: [
      {title: 'Home', active: true, icon: 'icon', href: `${location.hash}&link=home`},
      {title: 'About', icon: 'icon', href: `${location.hash}&link=about`},
      {title: 'Contact', icon: 'icon', href: `${location.hash}&link=contact`}
    ]    
  }

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <div style='width: 100px'>
      <NavBar  {...staticprops} {...props} {...selectprops}
{...inputprops} />
    </div>
   </div>    
</LibrarySnippet>



