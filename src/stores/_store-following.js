import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const storeFollowing = writable()
let self; storeFollowing.subscribe(x => {self = x})

//------------------------------------------------------------
export const initFollowingStore = () => {  
  return new Promise(resolve => {
    storeFollowing.set([])
    resolve()
  })
}
//------------------------------------------------------------

//------------------------------------------------------------
export const addToFollowing = (params) => {  
  return new Promise (resolve => {
    let {data} = params

    data.forEach(x => {
      const {_id, following} = x
      let exists = self.findIndex(y => y._id === _id) >= 0

      if(!exists){
        self.push(x)
      }
      else{
        self = self.map(x => {
          x.following = x._id === _id ? following : x.following
          return x
        })
      }
    })

    storeFollowing.set(self)

    resolve(self)
  })
}
//------------------------------------------------------------

//------------------------------------------------------------
export const findFollowingStatus = (_id) => {  
  return new Promise(resolve => {
    let res = self.find(x => x._id === _id) || null
    resolve(!!res ? res.following : null)
  })
}
//------------------------------------------------------------
