import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const navigationStore = writable()
export const sidebarStore = writable()

// init, set defaults
export const initNavigationStore = () => {
  return new Promise(resolve => {    
    sidebarStore.set({
      show: true
    })

    // eliminates flicker if loaded at least once
    setTimeout(() => {
      sidebarStore.set({
        show: false
      })    
    })

    navigationStore.set({    
      links: [
        {title: 'home', href: '', active: null, requireslogin: false, availableForMobile: true, opensubnav: false, subnav: []},
        {title: 'components', href: 'components', active: null, requireslogin: true, availableForMobile: false,  opensubnav: false,  subnav: [
          {title: 'Flickity', href: 'components/flickity', check: '/components/flickity'},
          {title: 'Doka Inline', href: 'components/dokainline', check: '/components/dokainline'},
          {title: 'Doka Modal', href: 'components/dokamodal', check: '/components/dokamodal'},
          {title: 'Filepond', href: 'components/filepond', check: '/components/filepond'},
          {title: 'Images', href: 'components/images', check: '/components/images'},
          {title: 'Panels', href: 'components/panels', check: '/components/panels'},
          {title: 'Inputs', href: 'components/inputs', check: '/components/inputs'},
          {title: 'Buttons', href: 'components/buttons', check: '/components/buttons'},
          {title: 'Tabs', href: 'components/tabs', check: '/components/tabs'},
          {title: 'Cards', href: 'components/cards', check: '/components/cards'},
          {title: 'SVGS', href: 'components/svgs', check: '/components/svgs'},		
          {title: 'Timeline', href: 'components/timeline', check: '/components/timeline'},
          {title: 'Utilities', href: 'components/utilities', check: '/components/utilities'},
          {title: 'Notifications', href: 'components/notifications', check: '/components/notifications'},
          {title: 'Modals', href: 'components/modals', check: '/components/modals'},
          {title: 'Snapps', href: 'components/snapps', check: '/components/snapps'},
          {title: 'Colorscheme', href: 'components/colorscheme', check: '/components/colorscheme'},
        ]},
        {title: 'about', href: 'about', active: null, requireslogin: false, availableForMobile: true, opensubnav: false,  subnav: []},
        {title: 'search', href: 'search', active: null, requireslogin: false, availableForMobile: true, opensubnav: false,  subnav: []},
        {title: 'images', href: 'images', active: null, requireslogin: true,  availableForMobile: true, opensubnav: false,  subnav: []},
        {title: 'server', href: 'server', active: null, requireslogin: false, availableForMobile: true, opensubnav: false,  subnav: []},
      ]
    })
    resolve()
  })
}

