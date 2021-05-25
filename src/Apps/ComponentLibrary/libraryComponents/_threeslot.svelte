<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import ThreeSlot from '@components/ThreeSlot/ThreeSlot.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'ThreeSlot',
    importName: '@components/ThreeSlot/ThreeSlot.svelte',
    properties: `
    export let style = null;
    export let showLeft = false;
    export let showRight = false;
    export let outline = false; 
    export let rounded = false;
    `,
    props: {
      showLeft: true,
      showRight: true,
      outline: false,
      rounded: false
    }
  }

  $: livecode = `    
    <ThreeSlot${fullstr}>
      <div slot='left'>
        <h2>Left</h2>
      </div>
  
      <div style='text-align: center'>
        <p>Content that is placed inbetween.</p>
      </div>
      
      <div slot='right'>
        <button>Right</button>
      </div>
    </ThreeSlot>   
     `

</script>

<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <ThreeSlot {...props} {...selectprops} >
      <div slot='left'>
        <h2>Left</h2>
      </div>
  
      <div style='text-align: center'>
        <p>Content that is placed inbetween.</p>
      </div>
      
      <div slot='right'>
        <button>Right</button>
      </div>
    </ThreeSlot>
   </div>    
</LibrarySnippet>


