<script>
  import TwoSlot from '../../../components/TwoSlot/TwoSlot'
  import LibraryBlock from './__LibraryBlock'
</script>

<h1>ThreeSlot</h1>
<hr>

<LibraryBlock section >
  <TwoSlot showLeft showRight >
    <h2>Left</h2>

    <div slot='right'>
      <button>On the Right</button>
    </div>
  </TwoSlot>
</LibraryBlock>
