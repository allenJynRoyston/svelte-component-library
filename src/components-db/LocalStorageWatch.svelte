<script lang='ts'>
  import {onMount} from 'svelte'

  export let key = null;
  export let type: 'localStorage' | 'sessionStorage' = 'localStorage'
  export let onFetch;


  //--------------------------- ONMOUNT
  onMount(() => {
    if(!!key){
      try{
        const data = JSON.parse(window[type].getItem(key) ) || null
        onFetch && onFetch({success: !!data, data})
      }
      catch(err){
        onFetch && onFetch({success: false})
      }
    }
    else{
      onFetch && onFetch({success: false})
    }
  })      
  //---------------------------


</script>

