<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import TwoSlot from '@base/TwoSlot.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'TwoSlot',
    importName: '@base/TwoSlot.svelte',
    props: {
      hideLeft: false,
      hideRight: false,
      outline: true,
      rounded: true,
      nopadding: false
    },
    inputs: [
      {forprop: 'style', renderAs: 'input', componentprop: {type: 'text', placeholder: 'outline: 1px solid red'}, value: null }
    ] 
  }

  $: livecode = `    
    <TwoSlot${propstr}${selectstr}${inputstr}>
      <h2 slot='left'>Left</h2>

      <div slot='right'>
        <button>On the Right</button>
      </div>
    </TwoSlot>   
     `

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <TwoSlot {...props}{...selectprops}{...inputprops} >
      <h2 slot='left'>Left</h2>

      <div slot='right'>
        <button>On the Right</button>
      </div>
    </TwoSlot>
   </div>    
</LibrarySnippet>


