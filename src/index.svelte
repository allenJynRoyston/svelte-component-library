<script lang='ts'>
  //--------------------------- IMPORTS  
  import {setContext} from 'svelte';
  import HashWatch from './components/URLWatcher/HashWatch.svelte'
  import Link from './components/Link/Link.svelte'
  import chroma from "chroma-js";

  import ComponentLibraryApp from './Apps/ComponentLibrary/ComponentLibrary.svelte'
  import ComponentDBLibrary from './Apps/ComponentDBLibrary/ComponentDBLibrary.svelte'
  import StrongCookieApp from './Apps/StrongCookie/StrongCookie.svelte'

  //--------------------------- 

  //--------------------------- APP CONTEXT 
  console.log(  )
  const colors = {
    black: [],
    white: []
  }
  
  const blacks = ['#111', '#333', '#444', '#555', '#666', '#777', '#888', '#999']
  const whites = ['white', '#eee']  
  
  blacks.forEach((color, index) => {
    let name = `--black-${index}`
    document.documentElement.style.setProperty(name, color)
    colors.black.push({name, color})
  })  

  whites.forEach((color, index) => {
    let name = `--white-${index}`
    document.documentElement.style.setProperty(name, color)
    colors.white.push({name, color})
  })    
 

  setContext('colors', colors)
  //---------------------------   

  //--------------------------- VARS  
  let view = null;
  let ele;
  //---------------------------  

  //--------------------------- ONMOUNT

  //---------------------------


  //--------------------------- FUNCTIONS
  const hashChange = ({hash}) => {
    view = hash || 'components';
  }
  //---------------------------

</script>

<div id='app-wrapper' bind:this={ele}>
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
</div>


<div id='app-selector'>
  <Link href='#components' active={view === 'components'} onClick={() => {view = 'components'}}>Components</Link>
  <Link href='#component-db' active={view === 'component-db'} onClick={() => {view = 'component-db'}}>ComponentsDB</Link>
  <Link href='#strong-cookie' active={view === 'strong-cookie'} onClick={() => {view = 'strong-cookie'}}>StrongCookie</Link>
</div>


<style lang='scss'>
  @import './scss/global.scss';
   
  #app-wrapper{
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;

    .app-content{
      width: 100%;
      min-height: 100%;
    }
  }

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

    &:hover{
      opacity: 1;
    }
  }
</style>

