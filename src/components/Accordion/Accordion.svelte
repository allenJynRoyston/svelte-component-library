<script lang='ts'>
  import {getContext} from 'svelte';

  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import SVG from '@components/SVG/SVG.svelte'

  export let open = false
  export let full = false
  export let rounded = false;
  export let outline = false;
  export let listform = false;
  export let nopadding = false;

  export let onClick = null;


  const theme:string = getContext('theme')
  const colors:any = getContext('colors')

  
  $: isOpened = open;
  let ele;

  const toggle = () => {
    isOpened = !isOpened
    onClick && onClick(isOpened)
  }

</script>

<div class={`accordion ${theme}-theme`} class:nopadding={nopadding} class:rounded={rounded} class:outline={outline} bind:this={ele} >
  <div class='accordion-inner'>
    <TwoSlot {nopadding}>     

      <button slot='left' on:click={toggle} style='width: 100%; text-align: left'>
        <slot name='title'>
          <h2>Accordian</h2>
        </slot> 
      </button>  

      <div slot='right'>
        <SVG icon={isOpened ? 'minus' : 'plus'} size={10} onClick={toggle} fill={theme === 'dark' ? colors.white[0].color : colors.black[0].color}/>
      </div>
    </TwoSlot>
  </div>


  <div class='accordion-content' class:opened={isOpened} class:full={full}>
    <div class='inner'  class:nopadding={nopadding} class:listform={listform}>
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

    &.nopadding{
      width: 100%;
      padding: 0
    }

    &.rounded{
      border-radius: 10px
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

     
    border-radius: 0px; 
    margin-bottom: 10px;   

    button{
      background: none;
      border: none;
      cursor: pointer;
    }
  } 

  .accordion-inner{
    padding: 10px;

    &.nopadding{     
      padding: 0
    }    
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

    &.full{
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
