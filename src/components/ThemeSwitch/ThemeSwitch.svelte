<script lang='ts'>
  import {getContext} from 'svelte';
  import Link from "../Link/Link.svelte";
  
  export let links = ['dark', 'light']

  const theme:string = getContext('theme')


  const setTheme = (theme) => {
    localStorage.setItem('theme', theme)
    location.reload()
  }


</script>

<div class='themeswitcher' class:dark-theme={theme === 'dark'}>
  <Link underline inherit active={theme === 'light'} onClick={() => {setTheme('light')}}>
    Light
  </Link>  

  <Link underline inherit active={theme === 'dark'} onClick={() => {setTheme('dark')}}>
    Dark
  </Link>    
</div>

<style lang='scss'>
  .themeswitcher{
    width: 100%;
    justify-content: flex-start;
    display: flex;
    gap: 10px;
    font-size: 10px;
    font-weight: 700;
    color: var(--black-1);

    &.dark-theme{
      color: var(--white-1);
    }
  }
</style>