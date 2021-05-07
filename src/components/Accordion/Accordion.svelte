<script>
  import TwoSlot from '../TwoSlot/TwoSlot.svelte'
  import SVG from '../SVG/SVG.svelte'
  
  let open = false;

</script>

<div class='accordion'>
  <div class='accordion-inner'>
    <TwoSlot showLeft showRight>     

      <button on:click={() => {open = !open}}>
        <slot name='title'>
          <h2>Accordian</h2>
        </slot> 
      </button>  

      <div slot='right'>
        <SVG icon={open ? 'minus' : 'plus'} onClick={() => {open = !open}} fill="white"/>
      </div>
    </TwoSlot>
  </div>

  {#if open}
    <div class='accordion-content'>
      <div class='inner'>
        <slot name='content'>
          Accordion content... 
        </slot>
      </div>
    </div>
  {/if}

</div>

<style lang='scss' scoped>
  .accordion{
    width: 100%;
    background: #333;
    border-radius: 10px;

    button{
      background: none;
      border: none;
      cursor: pointer;
    }
  } 

  .accordion-inner{
    padding: 10px;
  }

  .accordion-content{
    max-height: 200px;
    overflow-x: hidden;
    overflow-y: auto;


    .inner{
      width: calc(100% - 20px);
      padding: 10px;
    }
    
  }
</style>
