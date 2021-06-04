<script lang='ts'>
  import {getContext} from 'svelte'
  import Link from '@base/Link.svelte'
  import SVG from '@base/SVG.svelte'

  export let style = null
  export let text = null
  export let href = null;
  export let dataTestid = null

  export let role = 'button'
  export let applyTheme = 'primary';
  export let size = 'normal'

  export let useGradiant = false;
  export let disabled = false
  export let rounded = false;
  export let hollow = false;
  export let target = null;
  export let exactfit = false;
  export let fullOnMobile = false;
  export let nomargin = false;  
  export let useToggle = false;
  export let toggled = false;
  export let full = false;
  export let nobg = false;

  export let onClick = null

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
  <Link inherit {href} {target} style={full ? 'width: 100%' : null}>
    <button class={`button ${applyTheme}${useGradiant ? '-gradiant' : ''} ${size} ${theme}-theme`} class:nobg={nobg} class:fullOnMobile={fullOnMobile} class:nomargin={nomargin} class:exactfit={exactfit} class:disabled={disabled} class:hollow={hollow} class:rounded={rounded} applyTheme='button' data-testid={dataTestid} {role} {disabled} {style} on:click={onClick && !disabled && onClick()}>      
      <span class='inner'>          
          <slot>{text || 'Button'}</slot>
          {#if useToggle}
            <SVG icon={toggled ? 'checkbox-checked' : 'checkbox-unchecked'} fill={toggled ? colors.success[0].color : colors.danger[0].color } size={iconSize()} />
          {/if}        
      </span>      
    </button>    
  </Link>
{:else}
  <button class={`button ${applyTheme}${useGradiant ? '-gradiant' : ''} ${size} ${theme}-theme`}  class:nobg={nobg} class:fullOnMobile={fullOnMobile} class:nomargin={nomargin} class:exactfit={exactfit} class:disabled={disabled} class:hollow={hollow} class:rounded={rounded} applyTheme='button' data-testid={dataTestid} {role} {disabled} {style} on:click={onClick && !disabled && onClick()}>
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

    &.nobg{
      background: none!important;
      outline: none!important;
      border: none!important;
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

      &-gradiant{
        color: var(--white-3-text);
        background:  linear-gradient(var(--white-1), var(--white-6));
      }      

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

      &-gradiant{
        color: var(--black-3-text);
        background:  linear-gradient(var(--black-1), var(--black-0));
      }

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

    $themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger';
    @each $theme in $themes {
      &.#{$theme}{
        border: 3px solid var(--#{$theme}-1);      
        background: var(--#{$theme}-1);
        color: var(--#{$theme}-1-text);

        &-gradiant{
          background:  linear-gradient(var(--#{$theme}-1), var(--#{$theme}-3));
          color: var(--#{$theme}-3-text);          
        }

        &.hollow{
          background: none!important;
          color: var(--#{$theme}-1)!important;
          border: 3px solid var(--#{$theme}-1)!important;      
          &:active{
            color: var(--#{$theme}-4);
            border: 3px solid var(--#{$theme}-4);     
          }           
        }

        &:active{
          color: var(--#{$theme}-4);
          border: 3px solid var(--#{$theme}-4);     
        }  
      }
    }   

 


  }
</style>
