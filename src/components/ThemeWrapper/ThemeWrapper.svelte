<script lang='ts'>
  import {onMount} from 'svelte';

  export let theme = 'light'
  export let delay = 1;
  export let refresh = true;
  export let ele = null;
  export let themeWatch = false;
  export let lock = false;

  onMount(() => {
    getChildren()
  })

  const getChildren = () => {
    setTimeout(() => {
      if(!!ele){
 
        if(lock){
          ele.setAttribute('theme-lock', true)
        }  

        const isLocked =  Boolean(ele?.getAttribute('theme-lock')) || false

        if(isLocked){
          for (let child of ele.querySelectorAll('.root-component')) {
            child.classList.remove("dark-theme");
            child.classList.remove("light-theme");
            child.classList.add(`${theme}-theme`);
          }
        }

      
      
      } 
    }, delay)    
  }


  $: {      
    themeWatch && getChildren()
  }  

</script>


<div data-theme={theme} bind:this={ele}>
  <slot />
</div>

