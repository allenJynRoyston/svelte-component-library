<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import ThreeSlot from '@components/ThreeSlot/ThreeSlot.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

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
    <ThreeSlot${propstr}${selectstr}${inputstr}>
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

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <ThreeSlot {...props} {...selectprops}
{...inputprops} >
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


