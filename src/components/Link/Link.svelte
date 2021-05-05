<script lang='ts'>

  //--------------------------- COMPONENT PROPS
  export let href: string
  export let active = false;
  export let onClick = null;
  //---------------------------

  //--------------------------- VARS    
  //--------------------------- ONMOUNT

  //---------------------------   

  //--------------------------- EVENT HANDLERS

  //---------------------------

  //--------------------------- $
  //---------------------------  

</script>

<a {href} class:active={active} on:click={() => {onClick && onClick()}}>
  <slot>Link</slot>
</a>


<style lang='scss' scoped>
  a{
    color: inherit;
    cursor: pointer;
    text-decoration: none;
    margin-bottom: 5px;

    &.active{
      color: red;
    }
    
  }
</style>