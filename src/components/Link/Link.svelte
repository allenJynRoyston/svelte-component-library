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

  const theme:string = getContext('theme')

</script>

<a class={`link ${theme}-theme ${type} ${classes}`} {target} {href} {style} rel="noreferrer"  class:outline={outline} class:underline={underline} class:exactfit={exactfit} class:inherit={inherit} class:active={active} on:click={() => {onClick && onClick()}}>
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
    
    &.primary{
      &.active{
        color: var(--primary-0);
        &.underline{
          border-bottom: 2px solid var(--primary-1);
        }
      }      
    }

    &.secondary{
      &.active{
        color: var(--secondary-0);
        &.underline{
          border-bottom: 2px solid var(--secondary-1);
        }
      }      
    }  

    &.magic{      
      &.active{
        color: var(--magic-0);
        &.underline{
          border-bottom: 2px solid var(--magic-1);
        }
      }      
    }    
    
    &.success{
      &.active{
        color: var(--success-0);
        &.underline{
          border-bottom: 2px solid var(--success-1);
        }
      }      
    }     
    
    &.warning{
      &.active{
        color: var(--warning-0);
        &.underline{
          border-bottom: 2px solid var(--warning-1);
        }
      }      
    }     
    
    &.danger{
      &.active{
        color: var(--danger-0);
        &.underline{
          border-bottom: 2px solid var(--danger-1);
        }
      }      
    }    
    
    &.black{
      &.active{
        color: var(--black-1);
        &.underline{
          border-bottom: 2px solid var(--black-2);
        }
      }      
    }   
    
    &.white{
      &.active{
        color: var(--white-0);
        &.underline{
          border-bottom: 2px solid var(--white-1);
        }
      }      
    }       


    &.inherit{
      color: inherit!important; 
    }
    
  }
</style>