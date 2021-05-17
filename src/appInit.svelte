<script context="module">
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('pwabuilder-sw.js');
      });  
    }
</script>

<script lang='ts'>
  //--------------------------- IMPORTS  
  import {setContext} from 'svelte';
  import HashWatch from './components/URLWatcher/HashWatch.svelte'
  import Link from './components/Link/Link.svelte'  
  import SnackBar from './components/Snackbar/Snackbar.svelte'
  import {createColorPallete, assignFonts} from './js/utility'
  import {isLocalDev} from './stores/store';

  import ComponentLibraryApp from './Apps/ComponentLibrary/ComponentLibrary.svelte'
  import ComponentDBLibrary from './Apps/ComponentDBLibrary/ComponentDBLibrary.svelte'
  import StrongCookieApp from './Apps/StrongCookie/StrongCookie.svelte'

  //--------------------------- FONTS
  const fonts = ['Noto Sans JP', 'Farro'] // also assign in scss file below
  assignFonts(fonts)
  setContext('fonts', fonts)
  //---------------------------   

  //---------------------------  THEME
  let defaultTheme = 'dark'
  let theme = localStorage.getItem('theme')
  theme = theme === 'dark' || theme === 'light' ? theme : defaultTheme
  localStorage.setItem('theme', theme)
  setContext('theme', theme)
  //---------------------------   

  //--------------------------- COLORS
  const colorSet = {
    black: theme === 'light' ? 
      {start: '#111', end: '#eee'} : 
      {start: '#111', end: '#eee'},
    white: theme === 'light' ? 
      {start: 'white', end: '#bdc3c7'} : 
      {start: 'white', end: '#bdc3c7'},
    primary: theme === 'light' ? 
      {start: '#0fbcf9', end: 'black'} : 
      {start: '#4bcffa', end: 'black'},
    secondary: theme === 'light' ? 
      {start: '#3c40c6', end: 'black'} : 
      {start: '#FD7272', end: 'black'},
    magic: theme === 'light' ? 
      {start: '#9b59b6', end: 'black'} : 
      {start: '#9b59b6', end: 'black'},
    success: theme === 'light' ? 
      {start: '#4cd137', end: 'black'} : 
      {start: '#4cd137', end: 'black'},
    warning: theme === 'light' ? 
      {start: '#e67e22', end: 'black'} : 
      {start: '#e67e22', end: 'black'},
    danger: theme === 'light' ? 
      {start: '#ff073a', end: 'black'} : 
      {start: '#d63031', end: 'black'},
  }
  setContext('colors', createColorPallete({colorSet, range: 10, theme}))
  //---------------------------     
  
  //---------------------------  SNACKBAR CODE
  let snack;
  setContext('addSnack', (newSnack) => {
    snack = newSnack
  })
  //--------------------------- 

  //--------------------------- HASHCHANGE  
  let view = null;
  const hashChange = async({hash}) => {
    view = hash || 'components';
  }
  //---------------------------

</script>

<SnackBar {snack} />
<HashWatch onChange={hashChange} />

<div id='app-root'>
  {#if view === 'components'}
    <ComponentLibraryApp />
  {/if}

  {#if view === 'component-db'}      
    <ComponentDBLibrary />    
  {/if}

  {#if view === 'strong-cookie'}
    <StrongCookieApp />
  {/if}      
</div>

<div id='app-selector' class:show={$isLocalDev}>  
  <Link inherit href='#components' active={view === 'components'} onClick={() => {view = 'components'}}>Components</Link>
  <Link inherit href='#component-db' active={view === 'component-db'} onClick={() => {view = 'component-db'}}>ComponentsDB</Link>
  <Link inherit href='#strong-cookie' active={view === 'strong-cookie'} onClick={() => {view = 'strong-cookie'}}>StrongCookie</Link>
</div>


<style lang='scss'>
  // Assign fonts here, must be placed before global import
  $fontOne: "Noto Sans JP";
  $fontTwo: "Farro";

  /* note:  any changes must have a hard refresh.  
     Comment out global.scss import, save, refresh, then uncomment and save again.  
  */
  @import './scss/global.scss';

  #app-selector{
    display: none;
    position: fixed;
    bottom: 10px;
    left: 10px;
    padding: 10px;
    border-radius: 10px;
    flex-direction: column;
    opacity: 0.1;
    transition: 0.3s;
    background: var(--primary-0);
    color: var(--primary-0-text);

    &.show{
      display: flex;
    }

    &:hover{
      opacity: 1;
    }
  }
</style>

