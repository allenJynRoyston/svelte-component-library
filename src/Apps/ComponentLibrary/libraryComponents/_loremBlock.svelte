<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'
  import ThemeWrapper from '@components/ThemeWrapper/ThemeWrapper.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'LoremBlock',
    importName: '@components/LoremBlock/LoremBlock.svelte',
    props: {
      ignoreTheme: false,      
    }, 
    inputs: [
      {forprop: 'style', renderAs: 'input', componentprop: {type: 'text', placeholder: 'outline: 1px solid white'}, value: null },
      {forprop: 'index', renderAs: 'input', componentprop: {type: 'number'}, value: null },
      {forprop: 'content', renderAs: 'input', componentprop: {type: 'text'}, value: 'Hello World!' },
      {forprop: 'length', renderAs: 'input', componentprop: {type: 'number'}, value: 1 }
    ]  
  }

  $: livecode = `   
    <ThemeWrapper invert>    
      <LoremBlock ${propstr}${selectstr}${inputstr} />
    </ThemeWrapper />
     `

</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <ThemeWrapper invert>
      <LoremBlock  {...props} {...selectprops} {...inputprops} />
    </ThemeWrapper>
   </div>    
</LibrarySnippet>
