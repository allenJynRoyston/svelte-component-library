<script>
  import {onMount, onDestroy} from 'svelte';

  export let height = '100vh'

  let ele;
  let topPos = 0

  const debounce = (func, wait, immediate) => {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

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
  