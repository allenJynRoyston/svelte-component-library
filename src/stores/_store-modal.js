import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const modalStore = writable()

// init, set defaults
export const initModalStore = () => {
  return new Promise(resolve => {
    modalStore.set({    
      login: {
        active: false
      },
      upload: {
        type: null,  // profile, cover, etc
        active: false,
        html: null,
        callback: () => {}
      },
      snapp: {
        active: false,
        html: null,
        userId: null,
        snappId: null,
        shareid: null,
        type: null,
        content: '',
        callback: () => {}
      },
      slider: {
        active: false,
        html: null,
        startAt: null,
        images: []
      },        
      userDetails: {
        active: false,
        html: null,
        fields: []
      },
      changePassword: {
        active: false,
        html: null,
      },
      changePin: {
        active: false,
        html: null,
      },
      accountSettings: {
        active: false,
        html: null,
      },  
      changeAlias: {
        active: false,
        html: null,
      },
      changeEmail: {
        active: false,
        html: null,
      },
      privacySettings: {
        active: false,
        html: null,
      },
      accountSettings: {
        active: false,
        html: null,
      },  
      themeAndLayout: {
        active: false,
        html: null,
      },
      flag: {
        active: false,
        snappId: null
      }, 
      channel: {
        active: false,
      }       
    })
    resolve()
  })
}

