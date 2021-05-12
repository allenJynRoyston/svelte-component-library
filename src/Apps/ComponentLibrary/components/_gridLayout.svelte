<script>
  import GridLayout from '../../../components/Layout/GridLayout'
  import LoremBlock from '../../../components/LoremBlock/LoremBlock'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'


  export let items = [
    {component: LoremBlock, row: 2, column: 2, props:{content: 'A'}}, 
    {component: LoremBlock, props: {content: 'B'}}, 
    {component: LoremBlock, props: {content: 'C'}}, 
    {component: LoremBlock, props: {content: 'D'}}, 
    {component: LoremBlock, props: {content: 'E'}}, 
    {component: LoremBlock, props: {content: 'F'}}
  ]

</script>

<h2>GridLayout</h2>
<hr>

<LibraryBlock >
  <GridLayout outline {items} />
</LibraryBlock>

<ThemeWrapper theme='dark'>
  <LibraryBlock >
    <GridLayout outline {items} />
  </LibraryBlock>
</ThemeWrapper>

<CodeBlock title='Properties:' snippet={`
  export let size:number = 150;
  export let gap:number = 10;

  export let outline:boolean = false;
  export let items:any = [{component: LoremBlock, row: 2, column: 2}, {component: LoremBlock}, {component: LoremBlock}]
`} />

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