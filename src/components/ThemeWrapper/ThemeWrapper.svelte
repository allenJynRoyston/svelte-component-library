<script lang='ts'>
  import {onMount} from 'svelte';

  export let theme = 'light'
  export let delay = 0;
  export let refresh = true;
  export let ele = null;
  export let render = false;

  onMount(() => {
    getChildren()
  })

  const getChildren = () => {
    setTimeout(() => {
      if(!!ele){
        for (let child of ele.querySelectorAll('.root-component')) {
          child.classList.remove("dark-theme");
          child.classList.remove("light-theme");
        }

        for (let child of ele.querySelectorAll('.root-component')) {
          child.classList.add(`${theme}-theme`);
        }         
      } 
    }, delay)    
  }


  $: {      
    render && getChildren()
  }  

</script>


<div data-theme={theme} bind:this={ele}>
  <slot />
</div>

