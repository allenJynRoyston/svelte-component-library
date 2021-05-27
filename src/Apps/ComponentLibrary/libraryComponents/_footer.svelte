<script lant='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Footer from '@components/Footer/Footer.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;  

  const snippet = {
    name: 'Footer',
    importName: '@components/Footer/Footer.svelte'
  }

  $: livecode = `    
    <Footer ${propstr}${selectstr}${inputstr}>
      Made with ❤️ Allen Royston 2021
    </Footer>
     `

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Footer {...props} {...selectprops}
{...inputprops}>
      Made with ❤️ Allen Royston 2021
    </Footer>
   </div>    

</LibrarySnippet>

