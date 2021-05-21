<script lang='ts'>
  import {getContext} from 'svelte';

  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import SVG from '@components/SVG/SVG.svelte'

  export let open = false
  export let fill = false
  export let rounded = false;
  export let outline = false;
  export let listform = false;
  
  let isOpened = open;
  let ele;

  const isDark = getContext('theme') === 'dark'
  const toggle = () => {
    isOpened = !isOpened
  }

</script>

<div class={`root-component accordion`} class:rounded={rounded} class:outline={outline} bind:this={ele} >
  <div class='accordion-inner'>
    <TwoSlot showLeft showRight>     

      <button on:click={toggle} style='width: 100%; text-align: left'>
        <slot name='title'>
          <h2>Accordian</h2>
        </slot> 
      </button>  

      <div slot='right'>
        <SVG icon={isOpened ? 'minus' : 'plus'} size={10} onClick={toggle} fill={isDark ? 'white' : '#333'}/>
      </div>
    </TwoSlot>
  </div>


  <div class='accordion-content' class:opened={isOpened} class:fill={fill}>
    <div class='inner' class:listform={listform}>
      <slot name='content'>
        Accordion content... 
      </slot>
    </div>
  </div>

</div>

<style lang='scss' scoped>
  .accordion{
    width: 100%;
    background: transparent;

    &.rounded{
      border-radius: 20px
    }

    &.outline{
      width: calc(100% - 6px);
      border: 3px solid var(--black-1);
      &.dark-theme{
        border: 3px solid var(--white-0);
      }
    }

    
    background: var(--white-2);
    button, .inner{
      color: var(--white-2-text);
    }      

    &.dark-theme{
      background: var(--black-3);
      button, .inner{
        color: var(--black-3-text);
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
    height: 0;
    max-height: 200px;
    overflow-x: hidden;
    overflow-y: auto;
    background: transparent;

    &.opened{
      height: auto
    }

    &.fill{
      max-height: 1000vh;
    }


    .inner{
      width: calc(100% - 40px);
      padding: 20px;
      &.listform{
        padding: 0 5px;
      }      
    }
    
  }
</style>
