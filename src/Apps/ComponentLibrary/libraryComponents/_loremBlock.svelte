<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'LoremBlock',
    importName: '@components/LoremBlock/LoremBlock.svelte',
    properties: `
    export let style = null;
    export let index = null;
    export let content = "Lorem ipsum dolor sit amet..."
    export let onClick = () => {};
    export let length = 1;
    `,
    inputs: [
      {label: 'style', prop: 'style', renderAs: 'input', value: null},
      {label: 'index', prop: 'index', renderAs: 'input', value: null},
      {label: 'content', prop: 'content', renderAs: 'input', value: 'Hello World!'},
    ]  
  }

  $: livecode = `    
    <LoremBlock ${propstr}${selectstr}${inputstr} />
     `

</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <LoremBlock  {...props} {...selectprops} {...inputprops} />
   </div>    
</LibrarySnippet>
