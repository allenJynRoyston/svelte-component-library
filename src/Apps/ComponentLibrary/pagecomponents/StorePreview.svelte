<script lang='ts'>
  import {DeviceStore, SiteStore, ModalStore} from '@store/store'
  import Footer from '@components/Footer/Footer.svelte'
  import Section from '@components/Section/Section.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
  import Accordian from '@components/Accordion/Accordion.svelte'

  const {appWidth, isMobile, isTabletAndBelow, isTablet, isDesktop, isLocalDev, isNativeMobile} = DeviceStore;
  const {		urlHash, urlParams, openSidebar, openNotch, searchValue } = SiteStore
  const {modalIsOpen, modalIsBusy, modalProps} = ModalStore
  

</script>

<Section paddingTop>
  <section>
    <h1>
      Available Stores:
    </h1>
    <hr>
    <br><br> 

    <Accordian fill>
      <div slot='title'>
        <h2>DeviceStore:</h2>
      </div>
      <div slot='content'>
        <CodeBlock open title='Import:' snippet={`
          import {DeviceStore} from '@store/store'
          const {appWidth, isMobile, isTabletAndBelow, isTablet, isDesktop} = DeviceStore;

          <p>
            Width: {$appWidth} 
          </p>
          <p class:active={$isMobile}>
            IsMobile: {$isMobile} 
          </p>
          <p class:active={$isTabletAndBelow}>
            isTabletAndBelow: {$isTabletAndBelow} 
          </p>           
          <p class:active={$isTablet}>
            IsTablet: {$isTablet} 
          </p>
          <p class:active={$isDesktop}>
            isDesktop: {$isDesktop}
          </p>               
          `} />  
          
          <p>
            Width: {$appWidth} 
          </p>
          <p class:active={$isMobile}>
            IsMobile: {$isMobile} 
          </p>
          <p class:active={$isTabletAndBelow}>
            isTabletAndBelow: {$isTabletAndBelow} 
          </p>           
          <p class:active={$isTablet}>
            IsTablet: {$isTablet} 
          </p>
          <p class:active={$isDesktop}>
            isDesktop: {$isDesktop}
          </p>     
          <p>
            isLocalDev: {$isLocalDev}
          </p>
          <p>
            isNativeMobile: {$isNativeMobile}
          </p>
    </Accordian>   
    
    
    <Accordian fill>
      <div slot='title'>
        <h2>SiteStore:</h2>
      </div>
      <div slot='content'>
        <CodeBlock open title='Import:' snippet={`
          import {SiteStore} from '@store/store'
          const {urlHash, urlParams, openSidebar, openNotch, searchValue} = DeviceStore;

          <p>
            openSidebar: {$openSidebar} 
          </p> 
          <p>
            openNotch: {$openNotch} 
          </p> 
          <p>
            searchValue: {$searchValue} 
          </p> 
          <p>
            urlHash: {JSON.stringify($urlHash, 4)} 
          </p> 
          <p>
            urlParams: {JSON.stringify($urlParams, 4)} 
          </p>             
          `} />  
          
          <p>
            openSidebar: {$openSidebar} 
          </p> 
          <p>
            openNotch: {$openNotch} 
          </p> 
          <p>
            searchValue: {$searchValue} 
          </p> 
          <p>
            urlHash: {JSON.stringify($urlHash, 4)} 
          </p> 
          <p>
            urlParams: {JSON.stringify($urlParams, 4)} 
          </p>                                                
    </Accordian>     
    
    <Accordian fill>
      <div slot='title'>
        <h2>ModalStore:</h2>
      </div>
      <div slot='content'>
        <CodeBlock open title='Import:' snippet={`
          import {ModalStore} from '@store/store'
          const {modalIsOpen, modalIsBusy, modalProps, onModalSubmit, setModalState} = DeviceStore;

          <p>
            modalIsOpen: {$modalIsOpen} 
          </p>   
          <p>
            modalIsBusy: {$modalIsBusy} 
          </p>     
          <p>
            modalProps: {$modalProps} 
          </p>            
          `} />  

        <p>
          modalIsOpen: {$modalIsOpen} 
        </p>   
        <p>
          modalIsBusy: {$modalIsBusy} 
        </p>     
        <p>
          modalProps: {$modalProps} 
        </p>  
        
     
        <CodeBlock open title='setModalState:' snippet={`
          setModalState(true) // open
          setModalState(false) // close
          `} />  
    </Accordian>         


  </section>
</Section>

<Footer />



<style lang='scss'>
  @import "../../../scss/src/_media-queries.scss";


  section{
    padding: 50px 0;
    max-width: 900px;
    margin: auto;

    @include tablet-landscape-and-below {
      padding: 20px 0;
    }
  }  

</style>