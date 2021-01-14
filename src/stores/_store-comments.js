import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const storeComments = writable()
let self; storeComments.subscribe(x => {self = x})

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
export const initCommentStore = () => {  
  return new Promise(resolve => {
    storeComments.set([])
    resolve()
  })
}
//------------------------------------------------------------

//------------------------------------------------------------
export const findCommentIndex = (_id) => {
  return self.findIndex(x => x._id === _id)  
}
//------------------------------------------------------------


//------------------------------------------------------------
export const addComments = (params) => {
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
      storeComments.set([...filtered, ...self])
    }
    
    resolve()
  })
}
//------------------------------------------------------------

//------------------------------------
export const addComment = (params) => {
  return new Promise(resolve => {
    let {data} = params

    // add additional properties
    data = addLocalProps(data)

    if(!!self){
      let alreadyExists = self.findIndex(x => x._id === data._id) !== -1        
      if(!alreadyExists){
        storeComments.set( [...[data], ...self] )
      }
    }
    resolve()
  })
}
//------------------------------------

//------------------------------------
export const replaceComment = (params) => {
  // return new Promise(resolve => {
  //   let {id, data} = params

  //   // add additional properties
  //   data = addLocalProps(data)

  //   if(!!self){
  //     let index = self.findIndex(x => x._id === id)    
  //     if(index >= 0){
  //       self[index] = data        
  //       storeComments.set(self)
  //     }      
  //   }
  //   resolve()
  // })
}
//------------------------------------