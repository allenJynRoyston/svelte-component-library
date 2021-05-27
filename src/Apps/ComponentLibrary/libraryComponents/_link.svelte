<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Link from '@components/Link/Link.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'Link',
    importName: '@components/Link/Link.svelte',
    properties: `
    export let href: string|null = null;
    export let onClick = null;
    export let text = null;
    export let type = 'default'
    export let target = null
    export let classes = '';

    export let active = false;
    export let inherit = false;
    export let underline = false;
    export let exactfit = false;
    `,
    props: {
      underline: false,
      exactfit: false,
      inherit: false,
      active: true,
      outline: false,
    }, 
    dropdowns: [
      {
        label: 'type',
        options: [null, 'primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
        value: 0        
      }   
    ]
  }  

  $: livecode = `    
    <Link${propstr}${selectstr}${inputstr}>
      I am a link
    </Link>   
     `  
   
</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Link {...props} {...selectprops}
{...inputprops} href='/' >I am a link</Link>
   </div>    
</LibrarySnippet>

