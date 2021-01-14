import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const storeImageData = writable()
let self; storeImageData.subscribe(x => {self = x})

const addLocalProps = (x) => {
  x.selected = false  
  return x
}

//------------------------------------------------------------
export const initImageDataStore = () => {  
  return new Promise(resolve => {
    storeImageData.set([])
    resolve()
  })
}
//------------------------------------------------------------

//------------------------------------------------------------
export const findImageDataIndex = (_id) => {
  return self.findIndex(x => x._id === _id)  
}
//------------------------------------------------------------


//------------------------------------------------------------
export const addImageDatas = (params) => {
  return new Promise (resolve => {
    let {data} = params

    let filtered = data.filter(x => {        
      return self.findIndex(y => y._id === x._id) === -1
    })

    // add additional properties
    filtered.map(x => {      
      return addLocalProps(x)
    })    

    if(!!data){
      storeImageData.set([...filtered, ...self])
    }

    resolve()
  })
}
//------------------------------------------------------------

//------------------------------------
export const addImageData = (params) => {
  return new Promise(resolve => {
    let {data} = params

    // add additional properties
    data = addLocalProps(data)    

    if(!!self){
      let alreadyExists = self.findIndex(x => x._id === data._id) !== -1        
      if(!alreadyExists){
        storeImageData.set( [...[data], ...self] )
      }
    }
    resolve()
  })
}
//------------------------------------
