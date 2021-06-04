<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Loader from '@base/Loader.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'Loader',
    importName: '@base/Loader.svelte',
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
    <Loader ${propstr}${selectstr}${inputstr}/> 
     `  
</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Loader {...props} {...selectprops}
{...inputprops} />
   </div>    
</LibrarySnippet>





