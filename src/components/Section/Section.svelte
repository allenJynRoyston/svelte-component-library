<script>
  export let className = null;
  export let style = null;
  
  export let nomargin = false;
  export let outline = false;

</script>

<div class={`section ${className}`} class:nomargin={nomargin} class:outline={outline} style={style} >
  <slot />
</div>

<style lang='scss'>
  @import "../../scss/src/_media-queries.scss";

  .section{
    width: calc(100% - 20px);
    padding: 0 10px;
    margin: 10px 0;

    &.nomargin{
      margin: 0;
    }

    &.outline{
      border: 3px dotted var(--black-1);
    }    
  
    @include desktop-and-up {     
      width: calc(100% - 40px);   
      padding: 0 20px;
    }  

  }
</style>