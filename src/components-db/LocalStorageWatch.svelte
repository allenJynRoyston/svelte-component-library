<script lang='ts'>
  export let key = null;
  export let type: 'localStorage' | 'sessionStorage' = 'localStorage'
  export let onFetch;

  function IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  //--------------------------- ONMOUNT
  if(!!key){
    try{
      const entry = window[type].getItem(key);
      if(IsJsonString(entry)){
        const data = JSON.parse(entry) || null
        onFetch && onFetch({success: !!data, data})
      }
      else{
        onFetch && onFetch({success: true, data: entry})
      }

    }
    catch(err){
      onFetch && onFetch({success: false})
    }
  }
  else{
    onFetch && onFetch({success: false})
  }  
  //---------------------------


</script>

