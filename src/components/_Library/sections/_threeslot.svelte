<script>
  import ThreeSlot from '../../ThreeSlot/ThreeSlot'
  import LibraryBlock from '../LibraryBlock'
</script>

<h1>ThreeSlot</h1>
<hr>

<LibraryBlock section >
  <ThreeSlot >
    <div slot='left'>
      <h2>Left</h2>
    </div>

    <div style='text-align: center'>
      <p>Content that is placed inbetween.</p>
    </div>
    
    <div slot='right'>
      <button>Right</button>
    </div>
  </ThreeSlot>
</LibraryBlock>
