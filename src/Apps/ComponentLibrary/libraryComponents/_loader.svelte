<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Loader from '@components/Loader/Loader.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'Loader',
    importName: '@components/Loader/Loader.svelte',
    properties: `
    export let show = false
    export let rounded = false;
    export let type = 'primary'
    export let skinny = false;
    export let nobg = false;
    export let fade = false;
    export let nomargin = false;
    `,
    props: {
      show: true,
      rounded: false,
      skinny: false,
      nobg: false,
      fade: false,
      nomargin: false
    }, 
    dropdowns: [
      {
        label: 'type',
        options: ['primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
        value: 0        
      }    
    ]
  }

  $: livecode = `    
    <Button ${fullstr} >
      Content
    </Button>   
     `  
</script>

<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <Loader {...props} {...selectprops} />
   </div>    
</LibrarySnippet>





