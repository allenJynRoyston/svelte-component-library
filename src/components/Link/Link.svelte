<script lang='ts'>

  //--------------------------- COMPONENT PROPS
  export let href: string|null = null;
  export let active = false;
  export let onClick = null;
  export let text = null;
  export let inherit = false;
  export let type = 'default'
  
  export let underline = false;
  export let fit = false;
  //---------------------------

  //--------------------------- VARS    
  //--------------------------- ONMOUNT

  //---------------------------   

  //--------------------------- EVENT HANDLERS

  //---------------------------

  //--------------------------- $
  //---------------------------  

</script>

<a {href} class={`link root-component ${type}`} class:fit={fit} class:underline={underline} class:inherit={inherit} class:active={active} on:click={() => {onClick && onClick()}}>
  <slot>{text || 'Link'}</slot>
</a>


<style lang='scss' scoped>
  a.link{    
    cursor: pointer;
    text-decoration: none;
    margin-bottom: 5px;
    
    &.fit{
      padding: 0;
      margin: 0;
      width: 100%;
    }

    &.inherit{
      color: inherit!important; 
    }

    &.active{
      font-weight: 700;
      text-indent: 5px;
      
      &.underline{
        text-indent: 0!important;
      }
    }

    &.default{
      color: var(--black-1);
      &.active{
        &.underline{
          border-bottom: 2px solid var(--black-1);;
        }
      }      
    }

    
    &.primary{
      color: var(--primary-0)!important;
      &.active{
        &.underline{
          border-bottom: 2px solid var(--primary-1)!important;
        }
      }      
    }

    &.secondary{
      color: var(--secondary-0)!important;
      &.active{
        &.underline{
          border-bottom: 2px solid var(--secondary-1)!important;
        }
      }      
    }  
    
    &.success{
      color: var(--success-0)!important;
      &.active{
        &.underline{
          border-bottom: 2px solid var(--success-1)!important;
        }
      }      
    }     
    
    &.warning{
      color: var(--warning-0)!important;
      &.active{
        &.underline{
          border-bottom: 2px solid var(--warning-1)!important;
        }
      }      
    }     
    
    &.danger{
      color: var(--danger-0)!important;
      &.active{
        &.underline{
          border-bottom: 2px solid var(--danger-1)!important;
        }
      }      
    }    
    
    &.black{
      color: var(--black-1)!important;
      &.active{
        &.underline{
          border-bottom: 2px solid var(--black-2)!important;
        }
      }      
    }   
    
    &.white{
      color: var(--white-0)!important;
      &.active{
        &.underline{
          border-bottom: 2px solid var(--white-1)!important;
        }
      }      
    }       

    &.dark-theme{
      color: var(--white-0);
      &.active{

        &.underline{
          border-bottom: 2px solid var(--white-0);;
        }
      }
    }

    
  }
</style>