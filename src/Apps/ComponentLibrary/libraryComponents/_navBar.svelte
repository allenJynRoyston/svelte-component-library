<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import NavBar from '@components/NavBar/NavBar.svelte'
  
  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

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
      <NavBar  ${fullstr} />
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

<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <div style='width: 100px'>
      <NavBar  {...staticprops} {...props} {...selectprops} />
    </div>
   </div>    
</LibrarySnippet>



