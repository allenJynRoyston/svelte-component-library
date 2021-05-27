<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'TwoSlot',
    importName: '@components/TwoSlot/TwoSlot.svelte',
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
    <TwoSlot${propstr}${selectstr}${inputstr}>
      <div slot='left'>
        <h2>Left</h2>
      </div>
  
      <div style='text-align: center'>
        <p>Content that is placed inbetween.</p>
      </div>
      
      <div slot='right'>
        <button>Right</button>
      </div>
    </TwoSlot>   
     `

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <TwoSlot {...props} {...selectprops}
{...inputprops} >
      <h2>Left</h2>

      <div slot='right'>
        <button>On the Right</button>
      </div>
    </TwoSlot>
   </div>    
</LibrarySnippet>


