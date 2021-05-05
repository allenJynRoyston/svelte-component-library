<script>
  //--------------------------- IMPORTS  
  import HashWatch from '../URLWatcher/HashWatch'
  import Link from '../Link/Link'

  import ComponentLibraryApp from '../../Apps/ComponentLibrary/ComponentLibrary'
  import StrongCookieApp from '../../Apps/StrongCookie/StrongCookie'
  import TestApp from '../../Apps/TestApp/TestApp'
  //--------------------------- 

  //--------------------------- APP CONTEXT   
  //---------------------------   

  //--------------------------- VARS  
  let view = null;
  let ele;
  //---------------------------  

  //--------------------------- ONMOUNT
  //---------------------------


  //--------------------------- FUNCTIONS
  const hashChange = ({hash, params}) => {
    view = hash || 'library';
    // ele && ele.scrollTo(0, 0)    
  }
  //---------------------------

</script>

<div id='app-wrapper' bind:this={ele}>
  <HashWatch onChange={hashChange} />
  <div class='app-content'>
    {#if view === 'test-app'}      
      <TestApp />    
    {/if}

    {#if view === 'strong-cookie'}
      <StrongCookieApp />
    {/if}      

    {#if view === 'library'}
      <ComponentLibraryApp />
    {/if}
  </div>
</div>


<div id='app-selector'>
  <Link href='#library' active={view === 'library'} onClick={() => {view = 'library'}}>Library</Link>
  <Link href='#test-app' active={view === 'test-app'} onClick={() => {view = 'app'}}>Test App</Link>
  <Link href='#strong-cookie' active={view === 'strong-cookie'} onClick={() => {view = 'strong-cookie'}}>Cookie</Link>
</div>


<style lang='scss'>
  @import '../../scss/global.scss';

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
    background: black;
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    opacity: 0.1;
    transition: 0.3s;
    &:hover{
      opacity: 1;
    }
  }
</style>

