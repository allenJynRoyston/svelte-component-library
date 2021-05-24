<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Accordion from '@components/Accordion/Accordion.svelte'
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'Accordion',
    importName: '@components/Accordion/Accordion.svelte',
    properties: `
    export let open = false
    export let fill = false
    export let rounded = false;
    export let outline = false;
    `,
    props: {
      outline: true,
      rounded: false,    
    }
  }


  $: livecode = `    
     <Accordion ${fullstr}>
      <div slot='title'>
        <h3>Accordion</h3>
      </div>
    
      <div slot='content'>
        <LoremBlock />
      </div>
    </Accordion> 
     `



</script>

<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>
    <Accordion {...props} {...selectprops}>
      <div slot='title'>
        <h3>Accordion</h3>
      </div>
    
      <div slot='content'>
        <LoremBlock />
      </div>
    </Accordion>    
  </div>
</LibrarySnippet>

