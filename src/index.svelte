<script lang='ts'>
  //--------------------------- IMPORTS  
  import {tick, setContext} from 'svelte';
  import HashWatch from './components/URLWatcher/HashWatch.svelte'
  import Link from './components/Link/Link.svelte'
  import ThemeWrapper from './components/ThemeWrapper/ThemeWrapper.svelte';
  import SnackBar from './components/Snackbar/Snackbar.svelte'

  import chroma from "chroma-js";

  import ComponentLibraryApp from './Apps/ComponentLibrary/ComponentLibrary.svelte'
  import ComponentDBLibrary from './Apps/ComponentDBLibrary/ComponentDBLibrary.svelte'
  import StrongCookieApp from './Apps/StrongCookie/StrongCookie.svelte'

  //--------------------------- COLORS
  const colors = {
    black: [],
    white: [],
    primary: [],
    secondary: [],
    success: [],
    warning: [],
    danger: []
  }
  
  const range = 10

  const scales = {
    black: chroma.scale(['#111','#999']).mode('lch').colors(range),
    white: chroma.scale(['white','#bdc3c7']).mode('lch').colors(range),
    success: chroma.scale(['#2ecc71','green']).mode('lch').colors(range),
    primary: chroma.scale(['#3498db','blue']).mode('lch').colors(range),
    secondary: chroma.scale(['#9b59b6','purple']).mode('lch').colors(range),
    warning: chroma.scale(['#e67e22','orange']).mode('lch').colors(range),
    danger: chroma.scale(['#e74c3c','red']).mode('lch').colors(range)
  }

  for (const [key] of Object.entries(scales)) {
    scales[key].forEach((x, index) => {
      let name = `--${key}-${index}`
      document.documentElement.style.setProperty(name, x)
      colors[key].push({name, color: x})     
    })
  } 

  setContext('colors', colors)
  //---------------------------   

  //---------------------------  THEME
  const theme = 'dark' 
  setContext('theme', theme)
  let render = true;
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
    render = false;
    await tick()    
    render = true;        
  }
  //---------------------------

</script>

<SnackBar {snack} />

<div id='app-wrapper'>
  <ThemeWrapper {render} {theme}>
    <HashWatch onChange={hashChange} />

    <div class='app-content'>
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
  </ThemeWrapper>
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

