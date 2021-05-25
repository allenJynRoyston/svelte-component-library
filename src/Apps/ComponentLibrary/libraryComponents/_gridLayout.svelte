<script lang='ts'>
  import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import GridLayout from '@components/Layout/GridLayout.svelte'
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'  

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops;   

  const snippet = {
    name: 'GridLayout',
    importName: '@components/GridLayout/GridLayout.svelte',
    properties: `
    export let size:number = 150;
    export let gap:number = 10;

    export let outline:boolean = false;
    export let items:any = [{component: LoremBlock, row: 2, column: 2}, {component: LoremBlock}, {component: LoremBlock}]
    `,
    props: {
      outline: true
    }, 
    dropdowns: [
      {
        label: 'size',
        options: [null, 100, 150, 200], 
        value: 0        
      },
      {
        label: 'gap',
        options: [null, 10, 20, 30, 40, 50], 
        value: 0        
      }      
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

      <GridLayout ${fullstr}/>
     `

</script>

<LibrarySnippet {...snippet} {livecode}  bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <GridLayout {items} {...props} {...selectprops} />
  </div>    
</LibrarySnippet>


