<script>
  import GridLayout from '@components/Layout/GridLayout'
  import LoremBlock from '@components/LoremBlock/LoremBlock'  
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'  

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

</script>

<h2>GridLayout</h2>
<hr>

<CodeBlock open title='Import:' snippet={`
  import GridLayout from '@components/Layout/GridLayout'
  `} />

<CodeBlock title='Properties:' snippet={`
  export let size:number = 150;
  export let gap:number = 10;

  export let outline:boolean = false;
  export let items:any = [{component: LoremBlock, row: 2, column: 2}, {component: LoremBlock}, {component: LoremBlock}]
  `} />

<LibraryBlock title='Default:'>
  <GridLayout outline {items} />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  export let items = [
    {component: LoremBlock, row: 2, column: 2, props:{content: 'A'}}, 
    {component: LoremBlock, props: {content: 'B'}}, 
    {component: LoremBlock, props: {content: 'C'}}, 
    {component: LoremBlock, props: {content: 'D'}}, 
    {component: LoremBlock, props: {content: 'E'}}, 
    {component: LoremBlock, props: {content: 'F'}}
  ]

  <GridLayout outline {items} />
  `} />  


<LibraryBlock title='Size (200):'>
  <GridLayout outline size={200} {items} />
</LibraryBlock>

<LibraryBlock title='Size (50):'>
  <GridLayout outline size={50} {items} />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  <GridLayout outline size={200} {items} />
  <GridLayout outline size={50} {items} />
  `} />  

<LibraryBlock title='Gap:'>
  <GridLayout outline {items} />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  export let items = [
    {component: LoremBlock, row: 2, column: 2, props:{content: 'A'}}, 
    {component: LoremBlock, props: {content: 'B'}}, 
    {component: LoremBlock, props: {content: 'C'}}, 
    {component: LoremBlock, props: {content: 'D'}}, 
    {component: LoremBlock, props: {content: 'E'}}, 
    {component: LoremBlock, props: {content: 'F'}}
  ]

  <GridLayout outline {items} />
  `} />  

<LibraryBlock title='Gap (100):'>
  <GridLayout outline {items} gap={100} />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <GridLayout outline {items} gap={100} />
  `} />  

<LibraryBlock title='No outline:'>
  <GridLayout {items} />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <GridLayout {items} />
  `} />  
