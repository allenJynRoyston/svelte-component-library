<script lang='ts'>
  import Link from "../Link/Link.svelte";
  import HashWatch from '../URLWatcher/HashWatch.svelte';

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
  {#each links as {title, active = false, href = '/', icon}, index}
    <Link inherit {href} active={watchedParam === title.toLowerCase()} underline >
      {title}
    </Link>  
  {/each}
</div>

<style lang='scss'>
  .nav-bar{
    display: flex;
    gap: 10px;
    font-weight: 700;
    color: var(--white-0-text);
    transform: translateY(3px);

    &.dark-theme{
      color: var(--black-0-text);
    }
  }
</style>