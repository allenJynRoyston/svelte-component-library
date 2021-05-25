<script lang='ts'>  
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import ColorText from '@components/ColorText/ColorText.svelte';
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'


  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'ColorText',
    importName: '@components/ColorText/ColorText.svelte',
    properties: `
    export let type = 'primary'
    export let bold = false;
    `,
    props: {
     
    }, 
    dropdowns: [
      {
        label: 'type',
        options: ['primary', 'secondary', 'magic', 'success', 'warning', 'danger'], 
        value: 0        
      }    
    ]
  }

  $: livecode = `    
    <ColorText ${fullstr} >
      <LoremBlock />
    </ColorText>
     `  
</script>

<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <ColorText {...props} {...selectprops}>
      <LoremBlock />
    </ColorText>
   </div>    

</LibrarySnippet>

