import * as store from 'svelte/store';
import {fetchVersion} from '../api/_api'
import {setCookie, clearCookie} from '../js/_scripts'

const {writable} = store

// defaults set in style.js
export const storeSelf = writable()
let self; storeSelf.subscribe(x => {self = x})
  
//------------------------------------
export const initstoreSelf = async(params) => {  
  let {loggedIn, loggedInUser, serverversion, buildversion} = params

  let res = await fetchVersion()
  if(res.success){    
    setCookie('__sfv', res.server)
    setCookie('__sfb', res.build)
  }

  // logged in
  if(loggedIn){
    // check version, logout if it doesn't match
    // clears localstorage but not session storage
    if(res.server !== serverversion || res.build !== buildversion){

      localStorage.clear();
      sessionStorage.clear();
      
      // clearCookie('__sfuid')
      // clearCookie('__sftoken')
      // clearCookie('__sfv')
      // clearCookie('__sfb')

      // setTimeout(() => {
      //   location.reload()
      // }, 1)
    }    
  }

  return new Promise(resolve => {    
    storeSelf.set({loggedIn, loggedInUser})
    resolve()
  })  
}
//------------------------------------




