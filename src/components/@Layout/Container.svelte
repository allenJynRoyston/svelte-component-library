<script lang='ts'>
  import {getContext} from 'svelte';
  
  export let offset = 0;

  const theme:string = getContext('theme')

</script>

<div class={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} container offset-${offset}`}>
  <slot />
</div>


<style lang='scss'>
  .container{
    background: var(--white-0);
    color: var(--white-0-text);

    &.dark-theme{
      background: var(--black-0);
      color: var(--black-0-text);
    }

    &.offset-1{
      background: var(--white-1);
      color: var(--white-1-text);

      &.dark-theme{
        background: var(--black-1);
        color: var(--black-1-text);
      }
    }

    &.offset-2{
      background: var(--white-2);
      color: var(--white-2-text);

      &.dark-theme{
        background: var(--black-2);
        color: var(--black-2-text);
      }
    }

    &.offset-3{
      background: var(--white-3);
      color: var(--white-3-text);

      &.dark-theme{
        background: var(--black-3);
        color: var(--black-3-text);
      }
    }  

    &.offset-4{
      background: var(--white-4);
      color: var(--white-4-text);

      &.dark-theme{
        background: var(--black-4);
        color: var(--black-4-text);
      }
    }   
    
    &.offset-5{
      background: var(--white-5);
      color: var(--white-5-text);

      &.dark-theme{
        background: var(--black-5);
        color: var(--black-5-text);
      }
    } 
    
    &.offset-6{
      background: var(--white-6);
      color: var(--white-6-text);

      &.dark-theme{
        background: var(--black-6);
        color: var(--black-6-text);
      }
    }     
  }
</style>