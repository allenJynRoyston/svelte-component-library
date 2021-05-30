<script lang='ts'>  
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import ColorText from '@components/ColorText/ColorText.svelte';
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'


  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'ColorText',
    importName: '@components/ColorText/ColorText.svelte',
    dropdowns: [
      {
        label: 'applyTheme',
        options: ['primary', 'secondary', 'magic', 'success', 'warning', 'danger'], 
        value: 0        
      }    
    ]
  }

  $: livecode = `    
    <ColorText ${propstr}${selectstr}${inputstr} >
      <LoremBlock />
    </ColorText>
     `  
</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <ColorText {...props} {...selectprops}{...inputprops}>
      <LoremBlock ignoreTheme />
    </ColorText>
   </div>    

</LibrarySnippet>

