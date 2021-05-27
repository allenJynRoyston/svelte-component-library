<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Accordion from '@components/Accordion/Accordion.svelte'
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'Accordion',
    importName: '@components/Accordion/Accordion.svelte',
    properties: `
    export let open = false
    export let full = false
    export let rounded = false;
    export let outline = false;
    `,
    props: {
      open: false,
      outline: true,
      rounded: false,  
      full: false  
    }
  }


  $: livecode = `    
     <Accordion${propstr}${selectstr}${inputstr}>
      <div slot='title'>
        <h3>Accordion</h3>
      </div>
    
      <div slot='content'>
        <LoremBlock />
        <LoremBlock />
        <LoremBlock />
        <LoremBlock />
      </div>
    </Accordion> 
     `



</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>
    <Accordion {...props} {...selectprops} {...inputprops} >
      <div slot='title'>
        <h3>Accordion</h3>
      </div>
    
      <div slot='content'>
        <LoremBlock />
        <LoremBlock />
        <LoremBlock />
        <LoremBlock />
      </div>
    </Accordion>    
  </div>
</LibrarySnippet>

