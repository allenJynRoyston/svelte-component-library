<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import ThreeSlot from '@base/ThreeSlot.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'ThreeSlot',
    importName: '@base/ThreeSlot.svelte',
    props: {
      hideLeft: false,
      hideRight: false,
      hideContent: false,
      outline: true,
      rounded: true
    },
    inputs: [
      {forprop: 'style', renderAs: 'input', componentprop: {type: 'text', placeholder: 'outline: 1px solid red'}, value: null }
    ]       
  }

  $: livecode = `    
    <ThreeSlot${propstr}${selectstr}${inputstr}>
      <div slot='left'>
        <h2>Left</h2>
      </div>
  
      <div slot='center' style='text-align: center'>
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
    <ThreeSlot {...props} {...selectprops}{...inputprops} >
      <div slot='left'>
        <h2>Left</h2>
      </div>
  
      <div slot='center' style='text-align: center'>
        <p>Content that is placed inbetween.</p>
      </div>
      
      <div slot='right'>
        <button>Right</button>
      </div>
    </ThreeSlot>
   </div>    
</LibrarySnippet>


