import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const storeSnapps = writable()
let self; storeSnapps.subscribe(x => {self = x})

const addLocalProps = (x) => {
  x.showComments = false
  x.showReply = false
  x.showOptions = false
  x.showEdit = false
  x.showShare = false
  x.eleHeight = null
  x.counts = null
  return x
}


//------------------------------------------------------------
export const initSnappsStore = () => {  
  return new Promise(resolve => {
    storeSnapps.set([])
    resolve()
  })
}
//------------------------------------------------------------

//------------------------------------------------------------
export const findSnappIndex = (_id) => {
  return self.findIndex(x => x._id === _id)  
}
//------------------------------------------------------------


//------------------------------------------------------------
export const addSnapps = (params) => {
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
      storeSnapps.set([...filtered, ...self])
    }
    
    resolve()
  })
}
//------------------------------------------------------------


//------------------------------------
export const addSnapp = (params) => {
  return new Promise(resolve => {
    let {data} = params

    // add additional properties
    data = addLocalProps(data)

    if(!!self){
      let alreadyExists = self.findIndex(x => x._id === data._id) !== -1        
      if(!alreadyExists){
        storeSnapps.set( [...[data], ...self] )
      }
    }
    resolve()
  })
}
//------------------------------------

//------------------------------------
export const replaceSnapp = (params) => {
  // return new Promise(resolve => {
  //   let {id, data} = params

  //   // add additional properties
  //   data = addLocalProps(data)

  //   if(!!self){
  //     let index = self.findIndex(x => x._id === id)    
  //     if(index >= 0){
  //       self[index] = data        
  //       storeSnapps.set(self)
  //     }      
  //   }
  //   resolve()
  // })
}
//------------------------------------