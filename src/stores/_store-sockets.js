import {writable} from 'svelte/store';
import * as api from '../api/_api'
import {storeSelf} from './_store-self' 
import {storeUsers} from './_store-users' 
import {storeSnapps} from './_store-snapps' 
import {storeComments} from './_store-comments' 
import {storeMetadata} from './_store-metadata'
import {storeImageData} from './_store-images'

export const storeSockets = writable()

// this store
let socket; 
let self; storeSockets.subscribe(x => {self = x})

// other stores
let selfstore; storeSelf.subscribe(x => {selfstore = x})
let userstore; storeUsers.subscribe(x => {userstore = x})
let snappstore; storeSnapps.subscribe(x => {snappstore = x})
let commentstore; storeComments.subscribe(x => {commentstore = x}) 
let metadatastore; storeMetadata.subscribe(x => {metadatastore = x})
let imagestore; storeImageData.subscribe(x => {imagestore = x})


//------------------------------------------------------------
export const initSockets = (connection) => {    
  socket = connection
  return new Promise(resolve => {
    storeSockets.set([])
    resolve()
  })
}
//------------------------------------------------------------

//------------------------------------------------------------
export const removeSockets = (params) => {    
  return new Promise(resolve => {
    let {roomname} = params
    let exists = self.findIndex(x => x === roomname)    
    if(!exists && !!roomname){
      socket.emit('unsubscribe', roomname)  
    }

  })
}
//------------------------------------------------------------

//------------------------------------------------------------
export const addSockets = (params) => {    
  return new Promise(resolve => {
    let {roomname} = params
    
    let exists = self.find(x => x === roomname)    

    if(!exists && !!roomname){
      self.push(roomname)    
      socket.emit('subscribe', roomname)  

      socket.on(roomname, async(res) => {
        let {fn, data} = res

        //----------------------------------------
        if(fn === 'ping'){
          resolve(socket)
        }
        //----------------------------------------

        //----------------------------------------
        if(fn === 'updateimagedata'){
          let {image} = data

          imagestore.map(x => {
            if(x._id === image._id){
              for(let key in x) {
                if(!!image[key]){
                  x[key] = image[key]
                }
              }              
            }
            return x
          })
          storeImageData.set(imagestore)
        }
        //----------------------------------------        

        //----------------------------------------
        if(fn === 'removeUserImages'){
          let {_id, type, ids} = data

          userstore.map(user => {
            if(user._id === _id){
              user.images[type] = user.images[type].filter(x => {                    
                return ids.indexOf(x._id) < 0
              })
              user.computed[type] = user.computed[type] !== null ?  (ids.indexOf(user.computed[type]._id) >= 0 ? null : user.computed[type]) : null
            }
            return user
          })
          storeUsers.set(userstore) // update store  

        }
        //----------------------------------------

        //----------------------------------------
        if(fn === 'updateuser'){
          let {user} = data

          //----------------------- UPDATE METADATA
          metadatastore.map(x => {
            if(x._id === user._id){
              for(let key in x) {
                if(!!user[key]){
                  x[key] = user[key]
                }
              }              
            }
            return x
          })
          storeMetadata.set(metadatastore)

          //----------------------- UPDATE USER
          userstore.map(x => {
            if(x._id === user._id){   
              for(let key in x) {
                if(!!user[key]){
                  x[key] = user[key]
                }
                if(selfstore.loggedIn && selfstore.loggedInUser._id === user._id){ 
                  selfstore.loggedInUser = x
                }
              }                                      
            }            
            return x
          })          
          storeUsers.set(userstore)
          storeSelf.set(selfstore);
          //-----------------------          
        }   
        //----------------------------------------

        //----------------------------------------
        if(fn === 'contentupdate'){
          let {_id} = data     
          snappstore.map(x => {
            if(x._id === _id){
              for(let key in data) {
                x[key] = data[key]
              }  
            }
            return x
          })
          storeSnapps.set(snappstore) // update store                            
        }
        //----------------------------------------

        //----------------------------------------
        if(fn === 'commentupdate'){
          let {_id} = data               
          commentstore.map(x => {
            if(x._id === _id){
              for(let key in data) {
                x[key] = data[key]
              }  
            }
            return x
          })
          storeComments.set(commentstore) // update store                            
        }
        //----------------------------------------
        
        //----------------------------------------
        if(fn === 'triggerFeedCheck'){
          let {_id, filterprop, filtercondition} = data   

          let user = userstore.find(x => x._id === _id)                    
          let firstIndex = user.userfeed.length > 0 ? user.userfeed[0] : null

          let res = await api.userFeedCheck({ _id, firstIndex, filterprop, filtercondition })             
          let {success, payload} = res
          
          if(success){
            let {count, user} = payload

            //----------------------- UPDATE USER
            userstore.map(x => {
              if(x._id === user._id){
                x.counts.userfeed = count
              }
              return x
            })
            storeUsers.set(userstore)
            //-----------------------
          
          }
          else{
            console.log("Error updating user feed: " + payload.reason)
          }               
                                 
        }
        //----------------------------------------

        //----------------------------------------
        if(fn === 'triggerSnappCount'){
          let {_id} = data          
          let userid = selfstore.loggedIn ? selfstore.loggedInUser._id : null            
          let item = snappstore.find(x => x._id === _id) || null        

          if(!!item){
            let {success, bundle} = await api.snappCountCheck({userid, _id, firstid: item.comments[0] || null, version: item.version})
            if(success){
              bundle.forEach(item => {
                let index = snappstore.findIndex(x => x._id === item._id)
                if(index >= 0){
                  for(let key in item) {
                    snappstore[index][key] = item[key]                    
                  }                     
                }                                   
              })
              storeSnapps.set(snappstore) // update store  
            }
          }          

        }
        //----------------------------------------

        //----------------------------------------
        if(fn === 'triggerCommentCount'){
          let {_id} = data          
          let userid = selfstore.loggedIn ? selfstore.loggedInUser._id : null            
          let item = commentstore.find(x => x._id === _id) || null        

          if(!!item){
            let {success, bundle} = await api.commentCountCheck({userid, _id, firstid: item.comments[0] || null})
            if(success){
              bundle.forEach(item => {
                let index = commentstore.findIndex(x => x._id === item._id)
                if(index >= 0){
                  for(let key in item) {
                    commentstore[index][key] = item[key]                    
                  }                     
                }                                   
              })
              storeComments.set(commentstore) // update store  
            }
          }          

        }
        //----------------------------------------        

        //----------------------------------------
        if(fn === 'triggerImageCount'){
          let {_id} = data          
          let userid = selfstore.loggedIn ? selfstore.loggedInUser._id : null            
          let item = imagestore.find(x => x._id === _id) || null        

          if(!!item){
            let {success, bundle} = await api.imageCountCheck({userid, _id, firstid: item.comments[0] || null})

            if(success){
              bundle.forEach(item => {
                let index = imagestore.findIndex(x => x._id === item._id)
                if(index >= 0){
                  for(let key in item) {
                    imagestore[index][key] = item[key]                    
                  }                     
                }                                   
              })
              storeImageData.set(imagestore) // update store  
            }
          }          

        }
        //----------------------------------------           
        
        //----------------------------------------
        if(fn === 'triggerNotificationCheck'){
          let {uid} = data

          let {success, isNew, total} = await api.fetchNotificationCount({uid})      

          userstore.map(user => {
            if(user._id === uid){
              user.counts.notifications = success ? {isNew, total} : {}
            }
            return user
          })
        
          storeUsers.set(userstore) 
        }
        //----------------------------------------

        //----------------------------------------
        if(fn === 'removeUserFromFollowing'){
          const {_id, uid, ut, count} = data
          const type = ut === 'newsbot' ? 'channels' : 'following'          
          userstore.map(user => {
            if(user._id === _id){     
              user[type] = user[type].filter(x => x !== uid)
              if(!!user.counts[type]){user.counts[type].count = count}
            }
            
            return user
          })
          storeUsers.set(userstore)   
        }
        //----------------------------------------  

        //----------------------------------------
        if(fn === 'addUserToFollowing'){
          const {_id, uid, ut, count} = data
          const type = ut === 'newsbot' ? 'channels' : 'following'          
          userstore.map(user => {
            if(user._id === _id){        
              let exists = user[type].findIndex(x => x === uid)
              if(exists === -1){
                user[type] = [uid, ...user[type]]                
              }
              if(!!user.counts[type]){user.counts[type].count = count}
            }            
            return user
          })
          storeUsers.set(userstore)          
        }
        //----------------------------------------

        //----------------------------------------
        if(fn === 'removeUserFromFollowers'){
          const {_id, uid, count} = data
          userstore.map(user => {
            if(user._id === _id){                   
              user.followers = user.followers.filter(x => x !== uid)
              if(!!user.counts.followers){
                user.counts.followers.count = count
              }                     
            }     
            return user
          })
          storeUsers.set(userstore)   
        }
        //----------------------------------------

        //----------------------------------------
        if(fn === 'addUserToFollowers'){
          const {_id, uid, count} = data
          userstore.map(user => {
            if(user._id === _id){    
              let exists = user.followers.findIndex(x => x === uid)
              if(exists === -1){
                user.followers = [uid, ...user.followers]                
              }              
              if(!!user.counts.followers){
                user.counts.followers.count = count
              }
              console.log(user.counts)
            }
            return user
          })
          storeUsers.set(userstore)    
        }
        //----------------------------------------


           
      });           
    }
    else{
      resolve(socket)
    }
  })
}
//------------------------------------------------------------