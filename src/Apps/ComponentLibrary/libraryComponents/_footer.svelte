<script lant='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Footer from '@components/Footer/Footer.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops;   

  const snippet = {
    name: 'Footer',
    importName: '@components/Footer/Footer.svelte'
  }

  $: livecode = `    
    <Footer ${fullstr}>
      Made with ❤️ Allen Royston 2021
    </Footer>
     `

</script>

<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <Footer {...props} {...selectprops}>
      Made with ❤️ Allen Royston 2021
    </Footer>
   </div>    

</LibrarySnippet>

