<script lang='ts'>

  //--------------------------- COMPONENT PROPS
  export let href: string|null = null;
  export let active = false;
  export let onClick = null;
  export let text = null;
  export let inherit = false;
  
  export let underline = false;
  //---------------------------

  //--------------------------- VARS    
  //--------------------------- ONMOUNT

  //---------------------------   

  //--------------------------- EVENT HANDLERS

  //---------------------------

  //--------------------------- $
  //---------------------------  

</script>

<a {href} class={`root-component`} class:underline={underline} class:inherit={inherit} class:active={active} on:click={() => {onClick && onClick()}}>
  <slot>{text || 'Link'}</slot>
</a>


<style lang='scss' scoped>
  a{    
    cursor: pointer;
    text-decoration: none;
    margin-bottom: 5px;
    color: var(--black-1);

    &.inherit{
      color: inherit!important; 
    }

    &.active{
      font-weight: 700;
      
      &.underline{
        border-bottom: 2px solid var(--black-1);;
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