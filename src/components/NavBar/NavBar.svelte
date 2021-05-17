<script lang='ts'>
  import Link from "../Link/Link.svelte";
  import HashWatch from '../URLWatcher/HashWatch.svelte';
  import SVG from '../SVG/SVG.svelte';

  export let links = []
  export let watchHash = null;
  export let watchProp = null;

  //--------------------------- HASHCHANGE  
  let watchedParam = null;
  let watchedHash = null;
  const hashChange = async({hash, params}) => {    
    watchedParam = !!params[watchProp] ? params[watchProp] : null;
    watchedHash = !!hash ? hash : null;
  }
  //---------------------------

</script>

<HashWatch onChange={watchProp && hashChange} />
<div class={`root-component nav-bar`}>
  <div class='links'>
    {#each links as {title, active = false, href = '/', icon}, index}
      <Link inherit {href} active={watchedParam === title.toLowerCase()} underline >
        {title}
      </Link>  
    {/each}
  </div>

  <div class='icons'>
    {#each links as {icon = 'home', title, active = false, href = '/', icon}, index}
      <Link inherit {href} active={watchedParam === title.toLowerCase()} underline >
        <SVG {icon} style='padding-bottom: 4px;' />
      </Link>  
    {/each}
  </div>  
</div>

<style lang='scss'>
  @import '../../scss/src/_media-queries.scss';

  .nav-bar{
    .links{
      display: none;
      gap: 10px;
      font-weight: 700;
      color: var(--white-0-text);
      transform: translateY(3px);    
      font-size: 12px;  
    }

    .icons{
      display: flex;
      gap: 15px;   
      transform: translateY(5px);             
    }

    @include tablet-portrait-and-up {
      .links{
        display: flex;
      }
      .icons{
        display: none;
      }
    }       

    &.dark-theme{
      .links{
        color: var(--black-0-text);
      }
    }
  }
</style>