import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const storeMetadata = writable()
let self; storeMetadata.subscribe(x => {self = x})

//------------------------------------------------------------
export const initMetadataStore = () => {  
  return new Promise(resolve => {
    storeMetadata.set([])
    resolve()
  })
}
//------------------------------------------------------------

//------------------------------------------------------------
export const findMetadataIndex = (_id) => {
  return self.findIndex(x => x._id === _id)  
}
//------------------------------------------------------------


//------------------------------------------------------------
export const addMetadatas = (params) => {
  return new Promise (resolve => {
    let {data} = params

    let filtered = data.filter(x => {        
      return self.findIndex(y => y._id === x._id) === -1
    })

    if(!!data){
      storeMetadata.set([...filtered, ...self])
    }

    resolve()
  })
}
//------------------------------------------------------------

//------------------------------------
export const addMetadata = (params) => {
  return new Promise(resolve => {
    let {data} = params

    if(!!self){
      let alreadyExists = self.findIndex(x => x._id === data._id) !== -1        
      if(!alreadyExists){
        storeMetadata.set( [...[data], ...self] )
      }
    }
    resolve()
  })
}
//------------------------------------
