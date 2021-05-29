<script lang='ts'>
  import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import GridLayout from '@components/Layout/GridLayout.svelte'
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'  

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;  

  const snippet = {
    name: 'GridLayout',
    importName: '@components/GridLayout/GridLayout.svelte',
    props: {
      outline: true
    }, 
    inputs: [
      {forprop: 'size', renderAs: 'input', componentprop: {type: 'number'}, value: 150 },
      {forprop: 'gap', renderAs: 'input', componentprop: {type: 'number'}, value: 10 }
    ]        
  }

  export let items = [
    {component: LoremBlock, row: 2, column: 2, props:{content: 'A'}}, 
    {component: LoremBlock, props: {content: 'B'}}, 
    {component: LoremBlock, props: {content: 'C'}}, 
    {component: LoremBlock, props: {content: 'D'}}, 
    {component: LoremBlock, props: {content: 'E'}}, 
    {component: LoremBlock, props: {content: 'F'}},
    {component: LoremBlock, props: {content: 'G'}}, 
    {component: LoremBlock, props: {content: 'H'}}, 
    {component: LoremBlock, props: {content: 'I'}}, 
    {component: LoremBlock, props: {content: 'J'}}, 
    {component: LoremBlock, props: {content: 'K'}}    
  ]

  $: livecode = `    
      export let items = [
        {component: LoremBlock, row: 2, column: 2, props:{content: 'A'}}, 
        {component: LoremBlock, props: {content: 'B'}}, 
        {component: LoremBlock, props: {content: 'C'}}, 
        {component: LoremBlock, props: {content: 'D'}}, 
        {component: LoremBlock, props: {content: 'E'}}, 
        {component: LoremBlock, props: {content: 'F'}}
      ]

      <GridLayout ${propstr}${selectstr}${inputstr}/>
     `

</script>

<LibrarySnippet {...snippet} {livecode}  bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <GridLayout {items} {...props} {...selectprops}
{...inputprops} />
  </div>    
</LibrarySnippet>


