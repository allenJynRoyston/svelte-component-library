<script lang='ts'>
  import {SiteStore} from '@store/store'
  import Button from '@components/Button/Button.svelte'
  import {getContext} from 'svelte';

  export let hashNav = 'tab';
  export let tabs = []
  export let applyTheme = 'black';
  export let onClick = null;

  const theme:string = getContext('theme');
  const {urlParams}  = SiteStore;


  $: getHref = (param, index) => {
		const hash =  location.hash.includes(`&${hashNav}`) ?  location.hash.split(`&${hashNav}`)[0] : location.hash;
    return  `${hash}&${hashNav}=${param || String(index)}`
  }

  $: active = (param, index) => !!$urlParams[hashNav] ? $urlParams[hashNav]?.toString() === index?.toString() || $urlParams[hashNav]?.toString() === param?.toString() : index === 0
</script>


<div class={`tabs ${theme}-theme`}>
  <div class='links'>
    {#each tabs as {title, param = null}, index}
      <Button nomargin exactfit {applyTheme} hollow={active(param, index)} href={getHref(param || String(index), index)} onClick={() => {onClick && onClick(index)}}>
        {title}
      </Button>
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
  }

  .content{
    display: none;
    &.active{
      display: block;
    }
  }
</style>