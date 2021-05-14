<script lang='ts'>
  //--------------------------- IMPORTS  
  import {setContext} from 'svelte';
  import HashWatch from './components/URLWatcher/HashWatch.svelte'
  import Link from './components/Link/Link.svelte'  
  import SnackBar from './components/Snackbar/Snackbar.svelte'
  import {createColorPallete} from './js/utility'

  import ComponentLibraryApp from './Apps/ComponentLibrary/ComponentLibrary.svelte'
  import ComponentDBLibrary from './Apps/ComponentDBLibrary/ComponentDBLibrary.svelte'
  import StrongCookieApp from './Apps/StrongCookie/StrongCookie.svelte'

  //--------------------------- COLORS
  setContext('colors', createColorPallete(10))
  //---------------------------   

  //---------------------------  THEME
  let theme = localStorage.getItem('theme')
  theme = theme === 'dark' || theme === 'light' ? theme : 'light'
  localStorage.setItem('theme', theme)
  setContext('theme', theme)
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

<div id='app-selector'>
  <Link inherit href='#components' active={view === 'components'} onClick={() => {view = 'components'}}>Components</Link>
  <Link inherit href='#component-db' active={view === 'component-db'} onClick={() => {view = 'component-db'}}>ComponentsDB</Link>
  <Link inherit href='#strong-cookie' active={view === 'strong-cookie'} onClick={() => {view = 'strong-cookie'}}>StrongCookie</Link>
</div>


<style lang='scss'>
  @import './scss/global.scss';

  #app-selector{
    position: fixed;
    bottom: 10px;
    left: 10px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    opacity: 0.1;
    transition: 0.3s;
    background: var(--black-0);
    color: white;

    &:hover{
      opacity: 1;
    }
  }
</style>

