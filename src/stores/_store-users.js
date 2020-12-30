import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const storeUsers = writable()
let self; storeUsers.subscribe(x => {self = x}) 
 
const addLocalProps = (x) => {
  x.onhash = 'feed'  
  return x
}

//------------------------------------
export const initUsersStore = () => { 
  return new Promise(resolve => { 
    storeUsers.set([])
    resolve()
  })
}
//------------------------------------


//------------------------------------
export const findUserIndex = (_id) => {
  return self.findIndex(x => x._id === _id)    
}
//------------------------------------

//------------------------------------
export const addUser = (params) => {
  return new Promise(resolve => {
    let {data} = params

    // add additional properties
    data = addLocalProps(data)     

    if(!!self){
      let alreadyExists = self.findIndex(x => x._id === data._id) !== -1        
      if(!alreadyExists){
        storeUsers.set( [...[data], ...self] )
      }
    }
    resolve()
  })
}
//------------------------------------

//------------------------------------
export const addUsers = (params) => {
  return new Promise(resolve => {
    let {users} = params
    
    let filtered = users.filter(x => {        
      return self.findIndex(y => y._id === x._id) === -1
    })

    // add additional properties
    filtered.map(x => {      
      return addLocalProps(x)
    })    


    if(!!users){
      storeUsers.set([...filtered, ...self])
    }
    
    resolve()
  })
}
//------------------------------------