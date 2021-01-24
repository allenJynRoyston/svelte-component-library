<script lang='ts'>

  //--------------------------- COMPONENT PROPS
  export let href: string
  //---------------------------

  //--------------------------- VARS    
  //--------------------------- ONMOUNT

  //---------------------------   

  //--------------------------- EVENT HANDLERS

  //---------------------------

  //--------------------------- $
  //---------------------------  

</script>

<a {href}>
  <slot>Link</slot>
</a>


<style style='scss' scoped>
  a{
    cursor: pointer
  }
</style>