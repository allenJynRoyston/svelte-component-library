import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const globals = writable()
let self; globals.subscribe(x => {self = x})

//------------------------------------------------------------
export const initGlobalStore = (params) => {    
  return new Promise(resolve => {
    globals.set(params)
    resolve()
  })
}
//------------------------------------------------------------

