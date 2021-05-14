<script>
  import {onMount} from 'svelte';

  export let height = '100vh'

  let ele;
  let topPos = 0

  onMount(() => {
    topPos = ele.getBoundingClientRect().top
  })

  $: style = `height: calc(${height} - ${topPos}px)`
</script>


<div class='inner-container'{style} bind:this={ele}>
  <slot />
</div>


<style lang='scss'>
  .inner-container{    
    overflow-y: auto;
  }
</style>
  