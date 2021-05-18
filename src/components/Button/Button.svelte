<script lang='ts'>
  import Link from '@components/Link/Link.svelte'

  export let onClick = null
  export let disabled = false
  export let style = null
  export let role = 'button'
  export let dataTestid = null
  export let text = null

  export let type = 'primary';
  export let href = null;
  export let rounded = false;
  export let size = 'normal'
  export let hollow = false;
  export let target = null;
  export let exactfit = false;

</script>

{#if !!href}
  <Link fit {href} {target} >
    <button class={`root-component button ${type} ${size} `} class:exactfit={exactfit} class:disabled={disabled} class:hollow={hollow} class:rounded={rounded} type='button' data-testid={dataTestid} {role} {disabled} {style} on:click={onClick && !disabled && onClick()}>
      <slot>{text || 'Button'}</slot>
    </button>    
  </Link>
{:else}
  <button class={`root-component button ${type} ${size}`} class:exactfit={exactfit} class:disabled={disabled} class:hollow={hollow} class:rounded={rounded} type='button' data-testid={dataTestid} {role} {disabled} {style} on:click={onClick && !disabled && onClick()}>
    <slot>{text || 'Button'}</slot>
  </button>
{/if}


<style lang='scss' scoped>

  @import "../../scss/src/_media-queries.scss";


  button{
    outline: none;
    border: none;
    width: 100%;
    cursor: pointer;
    font-weight: 700;
    padding: 5px 0px;

    &.exactfit{
      height: auto;
      width: auto;
    }

    &.disabled{
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.small{
      font-size: 10px;
    }    

    &.large{
      font-size: 18px;
    }
    
    &.rounded{
      border-radius: 50px;
    }

    &.hollow{
      background: none!important;
      color: var(--black-1);
    }

    &:active{
      background: var(--black-3);
    }    

    @include tablet-portrait-and-up {
      font-size: 14px;
      padding: 0px 10px 2px 10px;
      height: 40px;       

      &.small{
        font-size: 10px;
        padding: 0 10px 2px 10px;
        height: 30px;
      }    

      &.large{
        font-size: 25px;
        padding: 0 10px 2px 10px;
        height: 65px;        
      }
    }    
                   

    &.white{      
      border: 3px solid var(--white-1);      
      background: var(--white-1);
      color: var(--black-1);

      &.hollow{
        background: none!important;
        color: var(--black-1);
        &:active{
          color: var(--white-4);
          border: 3px solid var(--white-4);     
        }           
      }

      &:active{
        color: var(--white-4);
        border: 3px solid var(--white-4);     
      }           

      &.dark-theme{
        border: 3px solid var(--white-3);
        background:var(--white-3);
        color: var(--black-3);

        &.hollow{
          color: var(--white-1-text);      
        }        

        &:active{
          background: var(--white-6);;
        }        
      }
    }  

    &.black{      
      border: 3px solid var(--black-0);      
      background: var(--black-1);
      color: var(--black-1-text);

      &.hollow{
        background: none!important;
        color: var(--black-1);
        &:active{
          color: var(--black-4);
          border: 3px solid var(--black-4);     
        }           
      }

      &:active{
        color: var(--black-4);
        border: 3px solid var(--black-4);     
      }           

      &.dark-theme{
        border: 3px solid var(--black-0);   
        background:var(--black-3);
        color: var(--black-3-text);

        &:active{
          background: var(--black-6);;
        }        
      }
    }    

    &.primary{      
      border: 3px solid var(--primary-1);      
      background: var(--primary-1);
      color: var(--primary-1-text);

      &.hollow{
        background: none!important;
        color: var(--primary-1);
        &:active{
          color: var(--primary-4);
          border: 3px solid var(--primary-4);     
        }           
      }

      &:active{
        color: var(--primary-4);
        border: 3px solid var(--primary-4);     
      }           

      &.dark-theme{
        border: 3px solid var(--primary-3);
        background:var(--primary-3);
        color: var(--primary-3-text);

        &:active{
          background: var(--primary-6);;
        }        
      }
    }

    &.secondary{
      border: 3px solid var(--secondary-1);      
      background: var(--secondary-1);
      color: var(--secondary-1-text);

      &.hollow{
        background: none!important;
        color: var(--secondary-1);
        &:active{
          color: var(--secondary-4);
          border: 3px solid var(--secondary-4);     
        }              
      }

      &:active{
        color: var(--secondary-4);
        border: 3px solid var(--secondary-4);     
      }            

      &.dark-theme{
        border: 3px solid var(--secondary-3);
        background:var(--secondary-3);
        color: var(--white-0);

        &:active{
          background: var(--secondary-6);;
        }        
      }
    }

    &.magic{
      border: 3px solid var(--magic-1);      
      background: var(--magic-1);
      color: var(--magic-1-text);

      &.hollow{
        background: none!important;
        color: var(--magic-1);
        &:active{
          color: var(--magic-4);
          border: 3px solid var(--magic-4);     
        }              
      }

      &:active{
        color: var(--magic-4);
        border: 3px solid var(--magic-4);     
      }       

      &.dark-theme{
        border: 3px solid var(--magic-3);
        background:var(--magic-3);
        color: var(--white-0);

        &:active{
          background: var(--magic-6);;
        }        
      }
    }


    &.success{
      border: 3px solid var(--success-1);      
      background: var(--success-1);
      color: var(--success-1-text);

      &.hollow{
        background: none!important;
        color: var(--success-1);
        &:active{
          color: var(--success-4);
          border: 3px solid var(--success-4);     
        }          
      }

      &:active{
        color: var(--success-4);
        border: 3px solid var(--success-4);     
      }    

      &.dark-theme{
        border: 3px solid var(--success-3);
        background:var(--success-3);
        color: var(--white-0);

        &:active{
          background: var(--success-6);;
        }        
      }
    }

    &.warning{
      border: 3px solid var(--warning-1);      
      background: var(--warning-1);
      color: var(--warning-1-text);

      &.hollow{
        background: none!important;
        color: var(--warning-1);
        &:active{
          color: var(--warning-4);
          border: 3px solid var(--warning-4);     
        }              
      }

      &:active{
        color: var(--warning-4);
        border: 3px solid var(--warning-4);     
      }           

      &.dark-theme{
        border: 3px solid var(--warning-3);
        background:var(--warning-3);
        color: var(--white-0);

        &:active{
          background: var(--warning-6);;
        }        
      }
    }  

    &.danger{
      border: 3px solid var(--danger-1);      
      background: var(--danger-1);
      color: var(--danger-1-text);

      &.hollow{
        background: none!important;
        color: var(--danger-1);
        &:active{
          color: var(--danger-4);
          border: 3px solid var(--danger-4);     
        }         
      }

      &:active{
        background: var(--danger-6);
      }           

      &.dark-theme{
        border: 3px solid var(--danger-3);
        background:var(--danger-3);
        color: var(--white-0);

        &:active{
          background: var(--danger-6);;
        }        
      }
    }    

  }
</style>
