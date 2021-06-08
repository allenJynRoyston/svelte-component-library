<script lang='ts'>
  export let src = null;
  export let alt = null;
  export let preference = 'height'

  export let rounded = false;
  export let shadow = false;

  export let onClick = null;
</script>

<div class='responsive-image' on:click={() => {onClick && onClick()}} class:clickable={!!onClick} class:rounded={rounded} class:shadow={shadow}>  
  {#if !!src}
    <img class={`${preference}`} {src} alt={alt || src}  />  
  {/if}
</div>

<style lang="scss" scoped>  
  .responsive-image{
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &.clickable{
      cursor: pointer;
    }

    &.rounded{
      border-radius: 10px;
    }    

    &.shadow{
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.50);  
    }        
  
    img{
      &.fill{
        width: 100%!important;
        height: 100%!important;
      }
      &.width{
        width: 100%;
        height: auto;
      }    
      &.height{
        height: 100%;
        width: auto;
      }  
    }    
  }
</style>
