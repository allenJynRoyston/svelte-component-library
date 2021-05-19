<script lang='ts'>
  import {DeviceStore} from '@store/store'
  import Footer from '@components/Footer/Footer.svelte'
  import Section from '@components/Section/Section.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
  import Accordian from '@components/Accordion/Accordion.svelte'

  const {appWidth, isMobile, isTabletAndBelow, isTablet, isDesktop} = DeviceStore;

  const classes = [
    'mobile-only', 'mobile-portrait-and-below', 'mobile-portrait-and-up',
    'mobile-landscape-and-below',
    'mobile-landscape-and-up',
    'tablet-portrait-and-below', 'tablet-portrait-and-up',
    'tablet-landscape-only', 'tablet-landscape-and-below',
    'tablet-landscape-and-up', 'desktop-and-up', 'desktop-and-below',
    'retina']


  

</script>

<Section paddingTop>
  <section>
    <h1>
      Utility:
    </h1>
    <hr>
    <br><br> 

    <Accordian open fill>
      <div slot='title'>
        <h2>Realtime Detection:</h2>
      </div>
      <div slot='content'>
        <CodeBlock open title='Import:' snippet={`
          import {DeviceStore} from '@store/store'
          const {appWidth, isMobile, isTabletAndBelow, isTablet, isDesktop} = DeviceStore;
  
          <p>
            Width: {$appWidth} 
          </p>
          <p class:active={$isMobile}>
            isMobile: {$isMobile} 
          </p>
          <p class:active={$isTablet}>
            isTablet: {$isTablet} 
          </p>
          <p class:active={$isTabletAndBelow}>
            isTabletAndBelow: {$isTabletAndBelow} 
          </p>          
          <p class:active={$isDesktop}>
            isDesktop: {$isDesktop}
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
      </div>
    </Accordian>    

    <Accordian open fill>
      <div slot='title'>
        <h2>Media Queries:</h2>
      </div>
      
      <div slot='content'>
        <CodeBlock open title='Import:' snippet={`
          @import "[root]/src/_media-queries.scss";
          `} />  
                
        {#each classes as _class}     
          <Accordian fill>
            <div slot='title'>
              <div class={`utility-block vis-${_class}`}>       
                <h3>.{_class}</h3>                      
              </div>
            </div>
        
            <div slot='content'>
              <CodeBlock open title='Example:' snippet={`
                @include ${_class} {
                  color: green
                }
                `} />  
            </div>
          </Accordian>  
        {/each}
      </div>
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

  p.active{
    color: var(--success-0);
  }

  .utility-block{ 
    opacity: 0.4;


    &.vis-mobile-only{
      color: var(--danger-0);
      @include mobile-only {
        opacity: 1;
        color: var(--success-3);
      }
    }

    &.vis-mobile-portrait-and-below{
      color: var(--danger-0);
      @include mobile-portrait-and-below {
        opacity: 1;
        color: var(--success-3);
      }
    }

    &.vis-mobile-portrait-and-below{
      color: var(--danger-0);
      @include mobile-portrait-and-below {
        opacity: 1;
        color: var(--success-3);
      }
    }

    &.vis-mobile-portrait-and-up{
      color: var(--danger-0);
      @include mobile-portrait-and-up {
        opacity: 1;
        color: var(--success-3);
      }
    }

    &.vis-mobile-landscape-and-below{
      color: var(--danger-0);
      @include mobile-landscape-and-below {
        opacity: 1;
        color: var(--success-3);
      }
    }

    &.vis-mobile-landscape-and-up{
      color: var(--danger-0);
      @include mobile-landscape-and-up {
        opacity: 1;
        color: var(--success-3);
      }
    }

    &.vis-tablet-only{
      color: var(--danger-0);
      @include tablet-only {
        opacity: 1;
        color: var(--success-3);
      }
    }

    &.vis-tablet-portrait-and-below{
      color: var(--danger-0);
      @include tablet-portrait-and-below {
        opacity: 1;
        color: var(--success-3);
      }
    }    

    &.vis-tablet-portrait-and-up{
      color: var(--danger-0);
      @include tablet-portrait-and-up {
        opacity: 1;
        color: var(--success-3);
      }
    }   

    &.vis-tablet-landscape-only{
      color: var(--danger-0);
      @include tablet-landscape-only {
        opacity: 1;
        color: var(--success-3);
      }
    }    

    &.vis-tablet-landscape-and-below{
      color: var(--danger-0);
      @include tablet-landscape-and-below {
        opacity: 1;
        color: var(--success-3);
      }
    } 

    &.vis-tablet-landscape-and-up{
      color: var(--danger-0);
      @include tablet-landscape-and-up {
        opacity: 1;
        color: var(--success-3);
      }
    }     

    &.vis-desktop-and-up{
      color: var(--danger-0);
      @include desktop-and-up {
        opacity: 1;
        color: var(--success-3);
      }
    }      

    &.vis-desktop-and-below{
      color: var(--danger-0);
      @include desktop-and-below {
        opacity: 1;
        color: var(--success-3);
      }
    }  

    &.vis-desktop-only{
      color: var(--danger-0);
      @include desktop-only {
        opacity: 1;
        color: var(--success-3);
      }
    }      

    &.vis-retina{
      color: var(--danger-0);
      @include retina {
        opacity: 1;
        color: var(--success-3);
      }
    }  

  }

</style>