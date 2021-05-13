<script lang='ts'>
  import {onMount} from 'svelte';
  import Link from "../Link/Link.svelte";
  
  export let links = ['dark', 'light']
  export let onClick;
  
  let isDark = false;
  let ele;

  onMount(() => {
    setTimeout(() => {
      isDark = ele.className.includes('dark-theme')
    }, 10)
  })

</script>

<div class={`root-component themeswitcher`} bind:this={ele}>
  <Link type='underline' inherit active={!isDark} onClick={() => {onClick && onClick('light')}}>
    Light
  </Link>  

  <Link type='underline' inherit active={isDark} onClick={() => {onClick && onClick('dark')}}>
    Dark
  </Link>    
</div>

<style lang='scss'>
  .themeswitcher{
    display: flex;
    gap: 10px;
    font-weight: 700;
    color: var(--black-1);

    &.dark-theme{
      color: var(--white-1);
    }
  }
</style>