import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const storeNotification = writable()
let self; storeNotification.subscribe(x => {self = x})

const addLocalProps = (x) => {
  /* add local props here */
  return x
}


//------------------------------------------------------------
export const initNotificationStore = () => {
  return new Promise(resolve => {
    storeNotification.set([])
    resolve()
  })
}
//------------------------------------------------------------

//------------------------------------------------------------
export const findNotificationIndex = (_id) => {
  return self.findIndex(x => x._id === _id)  
}
//------------------------------------------------------------

//------------------------------------------------------------
export const addNotifications = (params) => {
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
      storeNotification.set([...filtered, ...self])
    }
    
    resolve()
  })
}
//------------------------------------------------------------
