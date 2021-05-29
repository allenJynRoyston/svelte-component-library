<script>
  import {onMount, onDestroy} from 'svelte';
  import {SiteStore} from '@store/store'
  import {debounce} from '@js/utility'

  export let height = '100vh'
  export let adjustPx = 0
  export let accountForTopPos = false;

  let ele;
  let topPos = 0

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

<div class='inner-container'{style} bind:this={ele}>
  <slot />
</div>


<style lang='scss'>
  .inner-container{    
    overflow-y: auto;
  }
</style>
  