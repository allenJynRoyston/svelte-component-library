import * as store from 'svelte/store';
const {writable} = store

// defaults set in style.js
export const storeTheme = writable()

export const initThemeStore = (props) => {
  return new Promise(resolve => {
    let {currentTheme, listOfThemes, themeData} = props  
    storeTheme.set({currentTheme, listOfThemes, themeData, reset: false })
    resolve()
  })
}