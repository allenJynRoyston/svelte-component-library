<script>
  export let outline = false;
  export let className = null;
  export let style = null;
  
  export let paddingTop = false;

</script>

<div class={`section ${className}`} class:paddingTop={paddingTop} class:outline={outline} style={style} >
  <slot />
</div>

<style lang='scss'>
  @import "../../scss/src/_media-queries.scss";

  .section{
    width: calc(100% - 20px);
    padding: 0 10px;
    
    &.paddingTop{
      padding: 10px;      
    }

    &.outline{
      border: 3px dotted var(--black-1);
    }    
  
    @include desktop-and-up {     
      width: calc(100% - 40px);
      padding: 0 20px;

      &.paddingTop{
        padding: 20px;
      }      
    }  

  }
</style>