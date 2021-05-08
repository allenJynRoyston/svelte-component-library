<script>
  import TwoSlot from '../TwoSlot/TwoSlot.svelte'
  import SVG from '../SVG/SVG.svelte'

  export let open = false
  export let fill = false
  export let theme = 'dark';
  
  let isOpened = open;

  const toggle = () => {
    isOpened = !isOpened
  }

</script>

<div class='accordion' class:dark={theme === 'dark'} class:light={theme === 'light'}>
  <div class='accordion-inner'>
    <TwoSlot showLeft showRight>     

      <button on:click={toggle} style='width: 100%; text-align: left'>
        <slot name='title'>
          <h2>Accordian</h2>
        </slot> 
      </button>  

      <div slot='right'>
        <SVG icon={isOpened ? 'minus' : 'plus'} onClick={toggle} fill={theme === 'dark' ? 'white' : '#333'}/>
      </div>
    </TwoSlot>
  </div>

  {#if isOpened}
    <div class='accordion-content' class:fill={fill}>
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

    &.dark{
      background: #333;   
      button, .inner{
        color: white;
      }      
    }

    &.light{
      background: white;;
      button, .inner{
        color: #333;
      }     
    }
     
    border-radius: 10px; 
    margin-bottom: 10px;   

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

    &.fill{
      max-height: 1000vh;
    }


    .inner{
      width: calc(100% - 20px);
      padding: 10px;
    }
    
  }
</style>
