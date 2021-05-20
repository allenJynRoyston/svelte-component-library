<script lang='ts'>
  import {SiteStore} from '@store/store'
  import Link from '@components/Link/Link.svelte'
  import HashWatch from '@components/URLWatcher/HashWatch.svelte'

  const {urlHash, urlParams}  = SiteStore;

  export let tabRoot = 'tab';
  export let tabs = []

  const getHref = (param, index) => {
		const hash =  location.hash.includes(`&${tabRoot}`) ?  location.hash.split(`&${tabRoot}`)[0] : location.hash;
    return  `${hash}&${tabRoot}=${param || String(index)}`
  }


  $: active = (param, index) => !!$urlParams[tabRoot] ? $urlParams[tabRoot]?.toString() === index?.toString() || $urlParams[tabRoot]?.toString() === param?.toString() : index === 0

</script>


<div class={`tabs root-component`}>
  <div class='links'>
    {#each tabs as {title, param = null}, index}
      <Link underline active={active(param, index)} href={getHref(param || String(index), index)}>{title}</Link>
    {/each}  
  </div>

  {#each tabs as {component, props, param}, index}
    <div class='content' class:active={active(param, index)}>
      <svelte:component this={component} {...props}/>
    </div> 
  {/each}
</div>

<style lang='scss'>
  .tabs{
    width: 100%;
  }

  .links{
    width: 100%;
    display: flex;
    flex-direction: flex-start;
    align-items: center;
    gap: 10px;
  }

  .content{
    display: none;
    &.active{
      display: block;
    }
  }
</style>