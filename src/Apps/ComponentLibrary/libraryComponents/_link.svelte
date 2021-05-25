<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Link from '@components/Link/Link.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

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
    <Link${fullstr}>
      I am a link
    </Link>   
     `  
   
</script>


<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <Link {...props} {...selectprops} href='/' >I am a link</Link>
   </div>    
</LibrarySnippet>

