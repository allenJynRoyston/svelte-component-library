<script lang='ts'>
  import {onMount, onDestroy, getContext} from 'svelte';
  import {SiteStore} from '@store/store'
  import {debounce} from '@js/utility'

  export let height = '100vh'
  export let adjustPx = 0
  export let accountForTopPos = false;
  export let skinnybar = false;
  export let centered = false;

  let ele;
  let topPos = 0

  const theme:string = getContext('theme');

  const resizeEvent = debounce(() => {
    topPos = ele?.getBoundingClientRect().top || 0
  }, 100)

  // watches for changes in offsetHeight
	SiteStore.openNotch.subscribe(async(value) => {
    setTimeout(() => {
      resizeEvent()
    })
	});    


  onMount(() => {
    setTimeout(() => {
      resizeEvent()
    })
    window.addEventListener('resize', resizeEvent);
  })

  onDestroy(() => {
    window.removeEventListener('resize', resizeEvent)
  })

  $: style = accountForTopPos ?
  `height: calc(100vh - ${Math.abs(topPos)}px - ${adjustPx}px)` : 
  `height: calc(${height} - ${!!adjustPx ? `${adjustPx}px` : `0px`})`
</script>

<div class={`inner-container ${theme}-theme`} class:centered={centered} class:skinnybar={skinnybar} {style} bind:this={ele}>
  <slot />
</div>


<style lang='scss'>
  .inner-container{    
    overflow-y: auto;

    &.centered{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    &.skinnybar{
      &::-webkit-scrollbar {
        width: 2px;
      }
      &::-webkit-scrollbar-track {
        background: var(--white-2);      
      }
      &::-webkit-scrollbar-thumb {          
        background: var(--white-6);
      }
    }


    &.dark-theme{
      &.skinnybar{
        &::-webkit-scrollbar {
          width: 2px;
        }
        &::-webkit-scrollbar-track {
          background: var(--black-2);      
        }
        &::-webkit-scrollbar-thumb {          
          background: var(--black-6);
        }
      }
    }
  }
</style>
  