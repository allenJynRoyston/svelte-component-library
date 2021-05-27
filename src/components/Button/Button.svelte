<script lang='ts'>
  import {getContext} from 'svelte'
  import Link from '@components/Link/Link.svelte'
  import SVG from '@components/SVG/SVG.svelte'

  export let onClick = null
  export let disabled = false
  export let style = null
  export let role = 'button'
  export let dataTestid = null
  export let text = null

  export let type = 'primary';
  export let href = null;
  export let rounded = false;
  export let size = ''
  export let hollow = false;
  export let target = null;
  export let exactfit = false;
  export let fullOnMobile = false;
  export let nomargin = false;  

  export let useToggle = false;
  export let toggled = false;

  const theme:string = getContext('theme')
  const colors = getContext('colors')

  $: iconSize = () => {
    switch(size){
      case 'tiny': 
      return 8         
      case 'small': 
      return 10      
      case 'normal': 
      return 12
      case 'large': 
      return 16
    }  
  }


</script>

{#if !!href}
  <Link exactfit {href} {target} >
    <button class={`button ${type} ${size} ${theme}-theme`} class:fullOnMobile={fullOnMobile} class:nomargin={nomargin} class:exactfit={exactfit} class:disabled={disabled} class:hollow={hollow} class:rounded={rounded} type='button' data-testid={dataTestid} {role} {disabled} {style} on:click={onClick && !disabled && onClick()}>
    <span class='inner'>
      <slot>{text || 'Button'}</slot>
      {#if useToggle}
        <SVG icon={toggled ? 'checkbox-checked' : 'checkbox-unchecked'} fill={toggled ? colors.success[0].color : colors.danger[0].color } size={iconSize()} />
      {/if}
    </span>
    </button>    
  </Link>
{:else}
  <button class={`button ${type} ${size} ${theme}-theme`} class:fullOnMobile={fullOnMobile} class:nomargin={nomargin} class:exactfit={exactfit} class:disabled={disabled} class:hollow={hollow} class:rounded={rounded} type='button' data-testid={dataTestid} {role} {disabled} {style} on:click={onClick && !disabled && onClick()}>
    <span class='inner'>
      <slot>{text || 'Button'}</slot>
      {#if useToggle}
        <SVG icon={toggled ? 'checkbox-checked' : 'checkbox-unchecked'} fill={toggled ? colors.success[0].color : colors.danger[0].color } size={iconSize()} />
      {/if}
    </span>
  </button>
{/if}


<style lang='scss' scoped>

  @import "../../scss/src/_media-queries.scss";

  button{
    outline: none;
    border: none;
    width: 100%;
    cursor: pointer;
    font-weight: 600;
    padding: 0px 10px 2px 10px;
    margin: 2px;
    font-size: 12px;
    height: 30px;    
    white-space: nowrap;


    .inner{
      display: flex;
      align-items: center; 
      justify-content: center;
      gap: 10px;
      transform: translateY(1px)
    }

    &.nomargin{
      margin: 0;
    }

    &.exactfit{
      width: auto!important;
    }

    &.fullOnMobile{
      @include mobile-only {      
        width: 100%!important;
      }
    }

    &.disabled{
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.small{
      font-size: 9px;
      height: 30px;
    }    

    &.tiny{
      font-size: 9px;
      height: 20px;
    }    

    &.large{
      font-size: 14px;
      height: 40px;
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
                   

    &.white{      
      border: 3px solid var(--white-1);      
      background: var(--white-1);
      color: var(--white-1-text);

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
        color: var(--white-3-text);

        &.hollow{
          color: var(--white-1);      
        }        

        &:active{
          background: var(--white-6);;
        }        
      }
    }  

    &.black{      
      border: 3px solid var(--black-1);     
      background: var(--black-1);
      color: var(--black-1-text);

      &.hollow{
        border: 3px solid var(--black-0);   
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
        border: 3px solid var(--black-2);     
        background:var(--black-2);
        color: var(--black-2-text);

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

    }    

  }
</style>
