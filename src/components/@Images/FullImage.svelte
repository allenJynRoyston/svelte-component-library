<script lang='ts'>
  export let src = null;
  export let alt = null;

  export let rounded = false;
  export let shadow = false;

  export let onClick = null;  

  $: imageStyle = `background: url('${src}'); center center no-repeat; background-size: cover; width: 100%; height: 100%;`
</script>

{#if !!src}
  <div class='image-container' on:click={() => {onClick && onClick()}} style={imageStyle} alt={alt || src} class:clickable={!!onClick} class:rounded={rounded} class:shadow={shadow} />
{/if}

<style lang="scss" scoped>  
  .image-container{
    width: 100%;
    height: 100%;    
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

  }
</style>
