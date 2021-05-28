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
    export let inherit = false;
    export let type = 'default'
    export let target = null
    export let classes = '';
    export let style = ''

    export let active = false;
    export let underline = false;
    export let exactfit = false;
    export let outline = false;
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
      },
      {
        label: 'target',
        options: [null, '_blank', '_self', '_parent', '_top'], 
        value: 0        
      }           
    ], 
    inputs: [
      {label: 'text', prop: 'text', renderAs: 'input', value: 'I am a link'},
      {label: 'href', prop: 'href', renderAs: 'input', value: '/#something'},
      {label: 'style', prop: 'style', renderAs: 'input', value: 'margin-bottom: 20px'}      

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
    <Link {...props} {...selectprops} {...inputprops} />
   </div>    
</LibrarySnippet>

