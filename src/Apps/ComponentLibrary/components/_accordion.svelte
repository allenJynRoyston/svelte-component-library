<script>
  import LibraryBlock from './__LibraryBlock'
  import Accordian from '../../../components/Accordion/Accordion.svelte'
  import LoremBlock from '../../../components/LoremBlock/LoremBlock.svelte'

</script>

<h2>Accordion</h2>
<hr>
<LibraryBlock section >
  <Accordian >
    <div slot='title'>
      <h3>Accordion</h3>
    </div>

    <div slot='content'>
      Hello World!
    </div>
  </Accordian>
</LibraryBlock>


<LibraryBlock section >
  <Accordian >
    <div slot='title'>
      <h3>Accordion with Overflow</h3>
    </div>

    <div slot='content'>
      <LoremBlock />
    </div>
  </Accordian>
</LibraryBlock>
