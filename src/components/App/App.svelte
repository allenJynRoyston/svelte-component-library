<script>
  //--------------------------- IMPORTS  
  import Header from '../Header/Header'
  import Footer from '../Footer/Footer'
  import HashWatch from '../URLWatcher/HashWatch'
  import Link from '../Link/Link'
  import Library from '../_Library/Library'
  import TestApp from '../_TestApp/TestApp'
  //--------------------------- 

  //--------------------------- APP CONTEXT   
  //---------------------------   

  //--------------------------- VARS  
  let view = null;
  let startOn = null;
  //---------------------------  

  //--------------------------- ONMOUNT
  //---------------------------


  //--------------------------- FUNCTIONS
  const hashChange = ({hash, params}) => {
    view = hash;
    startOn = params.component || null
  }
  //---------------------------

</script>

<div id='app-wrapper'>
  <HashWatch onChange={hashChange} />
  
  <Header />
    <div class='app-content'>
      {#if view === 'app'}      
        <TestApp />    
      {/if}

      {#if view === 'library'}
        <Library startOn={startOn} />
      {/if}
    </div>
  <Footer />
</div>


<div id='app-selector'>
  <Link href='#app' onClick={() => {view = 'app'}}>App</Link>
  <Link href='#library' onClick={() => {view = 'library'}}>Library</Link>
</div>

<style lang='scss' scoped>
  #app-wrapper{
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;

    .app-content{
      width: 100%;
      min-height: 100%;
    }
  }

  #app-selector{
    position: fixed;
    top: 10px;
    right: 25px;
    padding: 10px;
    background: black;
    border-radius: 10px;
    color: white;
  }
</style>

