<script lang='ts'>
  import { getContext } from "svelte";

  export let onClick = null;
  export let type = 'default'
  export let target = null

  export let href: string|null = null;
  export let classes = '';
  export let style = ''
  export let text = null;

  export let inherit = false;
  export let active = false;
  export let underline = false;
  export let outline = false;
  export let exactfit = false
  export let applyHover = false;
  export let applyActive = false;

  const theme:string = getContext('theme')

</script>

<a class={`link ${theme}-theme ${type} ${classes}`} {target} {href} {style} rel="noreferrer" class:active={active} class:outline={outline} class:underline={underline} class:exactfit={exactfit} class:inherit={inherit}  class:applyHover={applyHover} class:applyActive={applyActive} on:click={() => {onClick && onClick()}}>
  <slot>{text || 'Link'}</slot>
</a>


<style lang='scss' scoped>
  .link{    
    cursor: pointer;
    text-decoration: none;

    &.exactfit{
      width: auto;
    }
    
    &.outline{
      border: 1px dashed var(--white-0);
    }

    &.active{
      font-weight: 700;                 
    }

    &.light-theme{
      color: var(--black-1);
      &.active{
        &.underline{
          border-bottom: 2px solid var(--black-1);;
        }
      }           
    }

    &.dark-theme{
      color: var(--white-0);      
      
      &.active{
        color: var(--white-2);
        &.underline{
          border-bottom: 2px solid var(--white-0);;
        }
      }
    }

    &.applyHover{
      &:hover{
        color: var(--primary-2)!important;
      }   
    }
    
    &.applyActive{
      &:active{
        color: var(--primary-4)!important;
      }             
    }      

    $themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white';
    @each $theme in $themes {
      &.#{$theme}{
        &.active{
          color: var(--#{$theme}-0);
          &.underline{
            border-bottom: 2px solid var(--#{$theme}-1);
          }
        }  
        &.applyHover{
          &:hover{
            color: var(--#{$theme}-2)!important;
          }   
        }
        &.applyActive{
          &:active{
            color: var(--#{$theme}-4)!important;
          }             
        }          
      }    
    }    

    &.inherit{
      color: inherit!important; 
    }
    
  }
</style>