<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Accordion from '@components/Accordion/Accordion.svelte'
  import ExampleBlock from '../components/ExampleBlock.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'Accordion',
    importName: '@components/Accordion/Accordion.svelte',
    props: {
      open: false,
      outline: true,
      rounded: false,  
      full: false,
      nopadding: false
    }
  }


  $: livecode = `    
     <Accordion${propstr}${selectstr}${inputstr}>
      <div slot='title'>
        <h3>Accordion</h3>
      </div>
    
      <div slot='content'>
        <ExampleBlock />
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
        <ExampleBlock />
      </div>
    </Accordion>    
  </div>
</LibrarySnippet>

