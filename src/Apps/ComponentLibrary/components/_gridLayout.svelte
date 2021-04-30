<script>
  import GridLayout from '../../../components/Layout/GridLayout'
  import LoremBlock from '../../../components/LoremBlock/LoremBlock'
  import LibraryBlock from './__LibraryBlock'

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
<LibraryBlock section >
  <GridLayout outline {items} />
</LibraryBlock>