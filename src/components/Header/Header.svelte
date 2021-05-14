<script lang='ts'>  
  import TwoSlot from '../TwoSlot/TwoSlot.svelte'
  import Link from '../Link/Link.svelte'

  export let logoSrc = null;
  export let bgSrc = null;
  export let logoLink = '/';

  export let navEle = null;
  export let centerEle = null;  
  export let footerEle = null;
  export let showCenter = false;  
  export let showFooter = false;

  $: imageStyle = `background: url('${bgSrc}'); center center no-repeat; background-size: cover;`
  
</script>

<nav class={`root-component`} style={!!bgSrc ? imageStyle: null}>
  
    <TwoSlot showLeft showRight>
      <Link href={logoLink} >
        <div class='inner'>
          {#if !!logoSrc}
            <img class='logo' src={logoSrc} alt='logo' />
          {/if}

          <div class='brand'>
            <slot>
              <h1>Svelte Component Library</h1>
            </slot>
          </div>
        </div>
      </Link>
      
      <div slot='right'>
        {#if !!navEle}
          <svelte:component this={navEle.component} {...navEle.props} />
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
</nav>


<style lang='scss' scoped>
  @import "../../scss/src/_media-queries.scss";

  nav{
    width: calc(100% - 40px);
    height: auto;
    overflow: hidden;
    padding: 20px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.25);  
    
        
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
      display: none;
      @include desktop-and-up {     
        display: block;
        font-size: 23px;
      }  

      @include tablet-only {     
        display: block;
        font-size: 18px;
      }         

      font-size: 10px;
      color: var(--white-0-text);     
    }

    &.dark-theme{
      background: var(--black-1);
      .brand{
        color: var(--black-1-text);
      }
    }

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
</style>