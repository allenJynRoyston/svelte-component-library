import { isWebpSupported, mobileCheck, mobileOrTablet, androidCheck, setCookie, getCookie, clearCookie } from '../js/_scripts'

import { IndexDBStore } from '../js/indexdb';
import { verifyUser } from '../api/_api'

import {initSockets, storeSockets, addSockets, removeSockets} from './_store-sockets'
import {initThemeStore, storeTheme} from './_store-theme'
import {initNotificationStore, storeNotification, findNotificationIndex, addNotifications} from './_store-notifications'
import {initModalStore, modalStore} from './_store-modal'
import {initNavigationStore, sidebarStore, navigationStore} from './_store-navigation'
import {initUsersStore, findUserIndex, storeUsers, addUsers, addUser} from './_store-users'
import {initSnappsStore, findSnappIndex, storeSnapps, addSnapp, addSnapps, replaceSnapp} from './_store-snapps'
import {initCommentStore, findCommentIndex, storeComments, addComment, addComments, replaceComment} from './_store-comments'
import {initMetadataStore, findMetadataIndex, storeMetadata, addMetadata, addMetadatas} from './_store-metadata'
import {initImageDataStore, findImageDataIndex, storeImageData, addImageData, addImageDatas} from './_store-images'
import {initOpengraphStore, findOpengraphIndex, storeOpengraphs, addOpengraphs, addOpengraph} from './_store-opengraph'
import {initStoreLayers, storeLayers} from './_store-layers'
import {initFollowingStore, storeFollowing, addToFollowing, findFollowingStatus} from './_store-following'

import {initstoreSelf, storeSelf} from './_store-self'
import {initStoreHome, homeStore} from './_store-home'
import {globals, initGlobalStore} from './_store-globals'


// defaults set in style.js
export {
  // _store-socket
  initSockets, storeSockets, addSockets, removeSockets,

  // _store-theme
  initThemeStore, storeTheme, 

  // _store-home
  initStoreHome, homeStore,

  // _store-notifications
  initNotificationStore, storeNotification, findNotificationIndex, addNotifications,

  // _store-navigation
  initNavigationStore, sidebarStore, navigationStore, 
  
  // _store-modal
  initModalStore, modalStore,

  // _store-user
  initUsersStore, findUserIndex, storeUsers, addUsers, addUser,

  // _store-snapps
  initSnappsStore, findSnappIndex, storeSnapps, addSnapp, addSnapps, replaceSnapp,

  // _store-comments
  initCommentStore, findCommentIndex, storeComments, addComment, addComments, replaceComment,

  // _store-metadata
  initMetadataStore, findMetadataIndex, storeMetadata, addMetadata, addMetadatas,

  // _store-imagedata
  initImageDataStore, findImageDataIndex, storeImageData, addImageData, addImageDatas,
  
  // _store-opengraph
  initOpengraphStore, findOpengraphIndex, storeOpengraphs, addOpengraphs, addOpengraph,

  // _store-layers
  initStoreLayers, storeLayers,

  // _store-self
  initstoreSelf, storeSelf,

  // _store-following
  initFollowingStore, storeFollowing, addToFollowing, findFollowingStatus,

  // _store-globals
  globals, initGlobalStore
};


// init store functions
export const storeInit = (params) => {
  return new Promise( async(resolve) => {
    let {socket} = params

    // inits
    await initSockets(socket)
    await initNotificationStore()
    await initModalStore()
    await initNavigationStore()
    await initSnappsStore()
    await initCommentStore()
    await initMetadataStore()
    await initImageDataStore()
    await initOpengraphStore()
    await initUsersStore()
    await initStoreHome()
    await initStoreLayers()
    await initFollowingStore()
    
    //---------------------------------------
    // CHECK IF LOGGED IN AND ASSIGN
    let userid = (localStorage.getItem('__sfuid') || getCookie('__sfuid')) || null
        userid = !!userid ? (userid.includes('expires=') ? null : userid) : null // iphone cookies check

    let token = (localStorage.getItem('__sftoken') || getCookie('__sftoken')) || null
        token = !!token ? (token.includes('expires=') ? null : token) : null // iphone cookies check

    let loggedInUser = null, loggedIn = false;        

    //------------------- veryfiy user
    if( userid !== null && token !== null){
      let {success, user} = await verifyUser({userid, token})
      loggedInUser = success ? user : null;
      loggedIn = success;          

      if(success){
        setCookie('__sfuid', userid, 30)        
        setCookie('__sftoken', token, 30)   

        localStorage.setItem('__sfuid', userid)
        localStorage.setItem('__sftoken', token)
      }
    }
            
    await initstoreSelf({loggedIn, loggedInUser, serverversion: getCookie('__sfv') || null, buildversion: getCookie('__sfb') || null})  
    //---------------------------------------

    //---------------------------------------  DATA STORAGE
    /* localStorage */
    const storage = [
      {key: 'storeTheme', fn: storeTheme},       
      {key: 'homeStore', fn: homeStore}
    ]
    
    storage.forEach(x => {
      const {fn, key} = x
      const data = localStorage.getItem(key)  
      if(!!data){ fn.set(JSON.parse(data)) }
    })  

    /* indexDB */
    const indexDbName = 'snappfireDB'
    const indexdb = new IndexDBStore(indexDbName, 1);            
    const indexdbStorage = [
      {key: 'users', fn: storeUsers},
      {key: 'snapps', fn: storeSnapps},
      {key: 'comments', fn: storeComments},
      {key: 'images', fn: storeImageData},
      {key: 'metadata', fn: storeMetadata},
      {key: 'opengraph', fn: storeOpengraphs},
      {key: 'notifications', fn: storeNotification},
      {key: 'layers', fn: storeLayers},
      {key: 'following', fn: storeFollowing}
    ]

    const indexdbTables = ['users', 'snapps', 'comments', 'images', 'metadata', 'opengraph', 'notifications', 'layers', 'theme', 'home', 'following']
    await indexdb.createTable(indexdbTables);

    const promises = []
    indexdbStorage.forEach(x => {
      const {fn, key} = x
      promises.push(new Promise(async(resolve) => {

        try{
          let data = await indexdb.getAll(key)

          // reset these values on startup 
          if(key === 'snapps' || key === 'comments'){ 
            data = data.map(x => {
              x.comments = []
              x.showComments = false
              x.showEdit = false
              return x
            })
          }

          if(key === 'users'){
            data = data.map(x => {
              x.counts = {
                channels: {},
                following: {},
                followers: {},
                userfeed: {},
                notifications: {}
              }
              x.userfeed = [] //x.userfeed.splice(0, 5)   
              x.channels = []
              x.following = []
              x.followers = []
              x.images = {
                profile: [],
                cover: [],
                uploaded: []
              }      
              return x
            })
          }

          if(key === 'images'){
            data = data.map(x => {
              x.comments = []
              x.showComments = false
              x.showEdit = false            
              x.selected = false    
              return x
            })
          }        

          if(key === 'following'){
            // data = []
          }

          fn.set(data)   
          resolve()     
        }
        catch(err){          
          indexedDB.deleteDatabase(indexDbName);
          // clear local storage
          localStorage.clear();

          // clear cookies
          clearCookie('__sfuid')
          clearCookie('__sfld');
          clearCookie('__sftoken');
          
          // location.reload();
          resolve()
        }          
      }))
    })
    await Promise.all(promises)
    //---------------------------------------


    //---------------------------------------
    // SAVE TO LOCAL STORAGE ON CHANGE
    /* update local storage on change */
    // local storage    
    storeTheme.subscribe(x => {       
      localStorage.setItem('storeTheme', JSON.stringify(x)) 
    })  

    homeStore.subscribe(x => { 
      localStorage.setItem('homeStore', JSON.stringify(x)) 
    })      
    
    // indexDB storage
    const assign = (tablename, data) => {
      if(data.length === 0){indexdb.clear(tablename)}
      else{ indexdb.setMany(tablename, data) }   
    }

    storeUsers.subscribe(x => {assign('users', x)})
    storeSnapps.subscribe(x => {assign('snapps', x)})
    storeComments.subscribe(x => {assign('comments', x)})    
    storeMetadata.subscribe(x => {assign('metadata', x)})    
    storeImageData.subscribe(x => {assign('images', x)})       
    storeOpengraphs.subscribe(x => {assign('opengraph', x)})    
    storeNotification.subscribe(x => {assign('notifications', x)})    
    storeLayers.subscribe(x => {assign('layers', x)}) 
    storeFollowing.subscribe(x => assign('following', x))   

    //---------------------------------------

    //---------------------------------------
    // GLOBALS
    let webp = await isWebpSupported(),
        isMobile = mobileCheck(), 
        isTablet = mobileOrTablet(),     
        isAndroid = androidCheck(),   
        loading = false,
        disconnected = false,
        screen = {
          width: window.screen.width,
          height: window.screen.height
        },
        hideNav = false,
        searchKeyword = null,
        searchResults = null;
    
    const clearAllStorage = () => {
      return new Promise(resolve => {
        // clear indexdb
        indexdbTables.forEach(table => { indexdb.clear(table) })
        
        // capture previous users
        let loggedOut = !!getCookie('__sflo') ? getCookie('__sflo').split(',') : []
        let userid = getCookie('__sfuid') || null  
        
        if(!!userid && !loggedOut.includes(userid)){
          loggedOut = loggedOut.length > 0 ? [...loggedOut, userid] : [userid]
        }
        setCookie('__sflo', loggedOut, 1);  

        // clear local storage
        localStorage.clear();

        // clear cookies
        clearCookie('__sfuid')
        clearCookie('__sfld');
        clearCookie('__sftoken');

        resolve()
      })     
    }

    const clearDBStorage = () => {
      return new Promise(resolve => {
        indexdbTables.forEach(table => { indexdb.clear(table) })
        resolve()
      })     
    }    

    initGlobalStore({
      webp, isMobile, isAndroid, loading, disconnected, 
      isTablet, screen, hideNav, 
      searchKeyword, searchResults, 
      clearDBStorage, clearAllStorage, indexdb
    })
    //
    //---------------------------------------

    resolve()
  })
}