<script lang='ts'>  
  import TwoSlot from '../TwoSlot/TwoSlot.svelte'
  import Link from '../Link/Link.svelte'

  export let logoSrc = null;
  export let bgSrc = null;
  export let logoLink = '/';

  export let navEle = null;
  export let centerEle = null;  
  export let expand = false;

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
    <div class='splash' class:expand={expand}>
      <svelte:component this={centerEle.component} {...centerEle.props} />
    </div>
  {/if}
</nav>


<style lang='scss' scoped>

  nav{
    width: calc(100% - 40px);
    height: auto;
    overflow: hidden;
    padding: 20px;
    background: #666;
        
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

    .brand{
      color: white;     
    }

    &.dark-theme{
      background: black;
      .brand{
        color: black;
      }
    }

  }

  .splash{
    display: none;

    &.expand{
      display: block;
    }
  }

  
</style>