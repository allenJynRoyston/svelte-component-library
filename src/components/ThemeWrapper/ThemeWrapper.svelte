<script lang='ts'>
  import {onMount} from 'svelte';

  export let theme = 'light'
  export let delay = 1;
  export let refresh = true;
  export let ele = null;
  export let themeWatch = false;
  export let lock = false;
  export let alwayslight = false;
  export let alwaysdark = false;

  onMount(() => {
    getChildren()
  })

  const getChildren = () => {
    setTimeout(() => {
      if(!!ele){

        const isLocked =  Boolean(ele?.getAttribute('theme-lock') === 'true') || false
        const isAlwaysLight = Boolean(ele?.getAttribute('data-alwayslight') === 'true') || false

        if(isLocked){
          for (let child of ele.querySelectorAll('.root-component')) {
            child.classList.remove("dark-theme");
            child.classList.remove("light-theme");
            child.classList.add(`${theme}-theme`);
          }        
        }
        if(lock){
          ele.setAttribute('theme-lock', true)
        }            
               
        if(isAlwaysLight){
          for (let child of ele.querySelectorAll('.root-component')) {
            child.classList.remove('root-component')
            child.classList.remove("dark-theme");
            child.classList.remove("light-theme");
            child.classList.add(`light-theme`);
          }
          ele.setAttribute('theme-lock', true)
        }

        if(alwaysdark){
          for (let child of ele.querySelectorAll('.root-component')) {
            child.classList.remove('root-component')
            child.classList.remove("dark-theme");
            child.classList.remove("light-theme");
            child.classList.add(`dark-theme`);
          }
          ele.setAttribute('theme-lock', true)
        }        


      } 

    }, 1)    
  }


  $: {      
    themeWatch && getChildren()
  }  

</script>


<div data-theme={theme} data-alwayslight={alwayslight} bind:this={ele}>
  <slot />
</div>

