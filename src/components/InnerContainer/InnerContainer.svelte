<script>
  import {onMount, onDestroy} from 'svelte';
  import {debounce} from '@js/utility'

  export let height = '100vh'
  export let adjustPx = 0

  let ele;
  let topPos = 0

  const resizeEvent = debounce(() => {
    topPos = ele?.getBoundingClientRect().top || 0
  }, 100)

  onMount(() => {
    setTimeout(() => {
      resizeEvent()
    })
    window.addEventListener('resize', resizeEvent);
  })

  onDestroy(() => {
    window.removeEventListener('resize', resizeEvent)
  })

  $: style = `height: calc(${height} - ${Math.abs(topPos)}px - ${adjustPx}px)`
</script>


<div class='inner-container'{style} bind:this={ele}>
  <slot />
</div>


<style lang='scss'>
  .inner-container{    
    overflow-y: auto;
  }
</style>
  