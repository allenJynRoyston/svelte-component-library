import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const storeOpengraphs = writable()
let self; storeOpengraphs.subscribe(x => {self = x})


//------------------------------------------------------------
export const initOpengraphStore = () => {  
  return new Promise(resolve => {
    storeOpengraphs.set([])
    resolve()
  })
}
//------------------------------------------------------------

//------------------------------------------------------------
export const findOpengraphIndex = (url) => {
  return self.findIndex(x => x.url === url)  
}
//------------------------------------------------------------


//------------------------------------------------------------
export const addOpengraphs = (params) => {
  return new Promise (resolve => {
    let {data} = params
    
    let filtered = data.filter(x => {    
      return x !== null ? self.findIndex(y => y._id === x._id) === -1 : false
    })

    if(!!data){
      storeOpengraphs.set([...filtered, ...self])
    }
    
    resolve()
  })
}
//------------------------------------------------------------

//------------------------------------
export const addOpengraph = (params) => {
  return new Promise(resolve => {
    let {data} = params

    // add additional properties
    data = addLocalProps(data)

    if(!!self){
      let alreadyExists = self.findIndex(x => x._id === data._id) !== -1        
      if(!alreadyExists){
        storeOpengraphs.set( [...[data], ...self] )
      }
    }
    resolve()
  })
}
//------------------------------------
