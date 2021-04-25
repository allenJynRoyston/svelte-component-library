<script>
  import {onMount, onDestroy} from 'svelte'
  export let onChange;
  let ready = false

  //--------------------------- ONMOUNT
  onMount(async() => {
    window.addEventListener("hashchange", locationHashChanged, false)    
    locationHashChanged()
    ready = true
  })  

  onDestroy(() => {
    if(ready){
      window.removeEventListener("hashchange", locationHashChanged)
    }
  })      
  //---------------------------

  const returnKeyPair = (arr) => {
    const keypair = {}
    arr.forEach(x => {
      const kp = x.split('=')
      if(!!kp[0]){
        keypair[kp[0]] = kp[1]
      }
    })
    return keypair
  }

  //--------------------------- EVENT HANDLERS
  const locationHashChanged = () => {
    let parts = window.location.hash.split('/')

    parts = parts.map(part => {
      return part.substring(1)
    })    

    if(!parts[0].includes('?')){
      onChange && onChange({hash: parts[0] === '' ? null : parts[0], params: {}})    
    }
    else{
      const strWithParams = parts[0].split('?')
      let kp = {}
      if(!!strWithParams[1]){
        if(strWithParams[1].includes('&')){
          const strWithAnd = strWithParams[1].split('&')
          kp = returnKeyPair(strWithAnd)
        }
        else{
          kp = returnKeyPair([strWithParams[1]])
        }
      }

      onChange && onChange({hash: strWithParams[0], params: {...kp}})
    }
  }  
</script>
