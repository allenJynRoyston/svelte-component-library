import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const homeStore = writable()
let self; homeStore.subscribe(x => {self = x}) 
 
//------------------------------------
export const initStoreHome = () => { 
  return new Promise(resolve => { 
    homeStore.set({
      collapse:{
        notifications: false,
        splash: false,
        snapp: false,
        followers: false,
        following: false,
        recentActivity: false,
        info: false,
        feed: false,
        suggestions: true,
        developerTools: true,        
      },
      recentActivity:{
        limit: 3
      },
      feed: {
        limit: 5
      }
    })
    resolve()
  })
}
//------------------------------------

