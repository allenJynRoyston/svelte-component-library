<script lang='ts'>
  import {getContext} from 'svelte';
  import Link from "@components/Link/Link.svelte";
  
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
    justify-content: flex-start;
    display: flex;
    gap: 10px;
    font-size: 12px;
    font-weight: 700;
    color: var(--black-1);
    padding: 10px;
    width: calc(100% - 40px);

    &.dark-theme{
      color: var(--white-1);
    }
  }
</style>