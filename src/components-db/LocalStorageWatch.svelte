<script lang='ts'>
  import {onMount} from 'svelte'

  export let key = null;
  export let type: 'localStorage' | 'sessionStorage' = 'localStorage'
  export let onFetch;


  //--------------------------- ONMOUNT
  onMount(() => {
    if(!!key){
      const data = JSON.parse(window[type].getItem(key) ) || null
      onFetch && onFetch({success: !!data, data})
    }
    else{
      onFetch && onFetch({success: false})
    }
  })      
  //---------------------------


</script>

