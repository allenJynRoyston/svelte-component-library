<script lang='ts'>  
  import { getContext } from 'svelte';
  import { SiteStore } from '@store/store';
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import Link from '@components/Link/Link.svelte'
  import SVG from '@components/SVG/SVG.svelte'
  import ThemeWrapper from '@components/ThemeWrapper/ThemeWrapper.svelte';

  export let title = null;
  export let logoSrc = null;
  export let bgSrc = null;
  export let logoLink = '/';

  export let navEle = null;
  export let heroEle = null;  
  export let footerEle = null;
  export let notchEle = null;
  
  export let showHero = false;  
  export let showFooter = false;
  export let showNotch = false;

  export let hideTitle = false;
  export let hideLogo = false;
  export let hideNav = false;

  export let invertColors = false;
  export let showBurgerMenuButton = false;

  const {openSidebar, openNotch} = SiteStore;

  const theme:string = getContext('theme');

  $: imageStyle = `background: url('${bgSrc}'); center center no-repeat; background-size: cover;`

</script>

<nav class={`nav-header ${theme}-theme`} style={!!bgSrc ? imageStyle: null}>
  <ThemeWrapper invert={invertColors}>
    <TwoSlot nopadding>
      <section class='inner' slot='left'>
        {#if showBurgerMenuButton}
          <span style='margin-right: 10px;'>
            <SVG icon={$openSidebar ? 'circleup' : 'circledown'} size={18} onClick={() => {$openSidebar = !$openSidebar}} />        
          </span>
        {/if}

        <Link href={logoLink} >
          <div class='inner'>

            {#if !!logoSrc && !hideLogo}
              <img class='logo' src={logoSrc} alt='logo' />
            {/if}

            {#if !hideTitle}
              <div class='brand'>
                <slot>
                  <h1>{title}</h1>
                </slot>
              </div>
            {/if}
          </div>
        </Link>
      </section>
      
      <div class='navcontainer' slot='right'>
        {#if !!navEle && !hideNav}
          <svelte:component this={navEle.component} {...navEle.props} />
        {/if}

        {#if !!notchEle}
         <SVG icon={$openNotch ? 'cross' : 'dots'} onClick={() => {$openNotch = !$openNotch}} style='transform: translateY(2px)' />
        {/if}
      </div>
    </TwoSlot>

    {#if !!heroEle}
      <div class='splash' class:expand={showHero}>
        <svelte:component this={heroEle.component} {...heroEle.props} />
      </div>
    {/if}

    {#if !!footerEle}
      <div class='footer' class:expand={showFooter}>
        <svelte:component this={footerEle.component} {...footerEle.props} />
      </div>
    {/if}

    {#if !!notchEle}
      <div class='header-notch' class:show={showNotch} >      
        <svelte:component this={notchEle.component} {...notchEle.props} />
      </div>
    {/if}
  </ThemeWrapper>
</nav>




<style lang='scss' scoped>
  @import "../../scss/src/_media-queries.scss";

  nav{
    position: relative;
    width: calc(100% - 40px);
    height: auto;
    overflow: hidden;
    padding: 20px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.25);  
    z-index: 1;

    .inner{
      display: flex;
      align-items: center;
      justify-content: flex-start;  
    }

    .logo{
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-right: 10px;
    }

    // background: var(--white-0);
    .brand{
      font-size: 10px;
      // color: var(--white-0-text);    

      @include desktop-and-up {     
        font-size: 12px;
      }  
    }

  }
  
  .navcontainer{
    display: flex;    
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .splash{
    display: none;

    &.expand{
      display: block;
    }
  }

  .footer{
    display: none;

    &.expand{
      display: flex;
      flex-direction: flex-end;
    }
  }

  .header-notch{
    width: 100%;
    justify-content: center;
    align-items: center;
    display: none;
    margin-top: 5px;

    &.show{
      display: flex
    }
  }
</style>