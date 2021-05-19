<script lang='ts'>  
  import { SiteStore } from '@store/store';
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import Link from '@components/Link/Link.svelte'
  import SVG from '@components/SVG/SVG.svelte'

  export let title = null;
  export let logoSrc = null;
  export let bgSrc = null;
  export let logoLink = '/';

  export let navEle = null;
  export let centerEle = null;  
  export let footerEle = null;
  export let notchEle = null;
  export let showCenter = false;  
  export let showFooter = false;
  export let showLayoutButton = false;

  let showNotch:boolean = notchEle?.show === undefined ? true : !!notchEle?.show

  const {openSidebar} = SiteStore;


  $: imageStyle = `background: url('${bgSrc}'); center center no-repeat; background-size: cover;`

</script>

<nav class={`root-component`} style={!!bgSrc ? imageStyle: null}>
  
    <TwoSlot showLeft showRight>
      {#if showLayoutButton}
        <span class='tablet-landscape-and-below' style='transform: translateY(-3px) translateX(-10px)'>
          <SVG icon={$openSidebar ? 'menu' : 'circleup'} size={24} onClick={() => {$openSidebar = !$openSidebar}} />        
        </span>
      {/if}

      <Link href={logoLink} >
        <div class='inner'>

          {#if !!logoSrc}
            <img class='logo' src={logoSrc} alt='logo' />
          {/if}

          <div class='brand'>
            <slot>
              <h1>{title}</h1>
            </slot>
          </div>
        </div>
      </Link>
      
      <div class='navcontainer' slot='right'>
        {#if !!navEle}
          <svelte:component this={navEle.component} {...navEle.props} />
        {/if}

        {#if !!notchEle}
         <SVG icon={showNotch ? 'cross' : 'search'} onClick={() => {showNotch = !showNotch}} />
        {/if}
      </div>
    </TwoSlot>

  {#if centerEle}
    <div class='splash' class:expand={showCenter}>
      <svelte:component this={centerEle.component} {...centerEle.props} />
    </div>
  {/if}

  {#if footerEle}
    <div class='footer' class:expand={showFooter}>
      <svelte:component this={footerEle.component} {...footerEle.props} />
    </div>
  {/if}

  {#if !!notchEle}
    <div class='header-notch' class:show={showNotch} >      
      <svelte:component this={notchEle.component} {...notchEle.props} />
    </div>
  {/if}

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
      justify-content: center;  
    }

    .logo{
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-right: 10px;
    }

    background: var(--white-0);
    .brand{
      font-size: 10px;
      color: var(--white-0-text);    

      @include desktop-and-up {     
        font-size: 12px;
      }  
    }

    &.dark-theme{
      background: var(--black-1);
      .brand{
        color: var(--black-1-text);
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