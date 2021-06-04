<script lang='ts'>
  import {onMount, tick, getContext} from 'svelte';

  export let forcetheme = null;
  export let invert = false;

  let ele = null;
    
  const theme:string = getContext('theme');

  const getInvert = (t) => {
    if(t === 'dark'){return 'light'}
    if(t === 'light'){return 'dark'}
  }

  onMount(() => {
    getChildren()
  })

  const getChildren = async() => {
    await tick()
    if(!!ele){
      let useTheme = !!forcetheme ? forcetheme : theme
      for (let child of ele.querySelectorAll('.dark-theme, .light-theme')) {
          child.classList.remove("dark-theme");
          child.classList.remove("light-theme");
          child.classList.add(`${invert ? getInvert(useTheme) : useTheme}-theme`);
      }
    } 
  }


  $: {     
    forcetheme && getChildren(); 
    (invert || !invert) && getChildren()
  }  

</script>


<div bind:this={ele}>
  <slot />
</div>

