import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const storeLayers = writable()
let self; storeLayers.subscribe(x => {self = x}) 
 
//------------------------------------
export const initStoreLayers = () => { 
  return new Promise(resolve => { 
    storeLayers.set([])
    resolve()
  })
}
//------------------------------------

