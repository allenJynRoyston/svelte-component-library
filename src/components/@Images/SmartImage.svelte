<script lang='ts'>
  export let src = null;
  export let alt = null;

  export let rounded = false;
  export let shadow = false;

  export let onClick = null;
  export let onImageLoad = null;

  let currentSrc = null;
  let preference = null 
  let imgW, imgH = null;
  let loading = true;

  const loadImage = () => {
    loading = true;

    const _img = new Image();
    _img.onload = function () {
      /* @ts-ignore */
      imgW = this.width;
      /* @ts-ignore */      
      imgH = this.height;
      preference = imgW >= imgH ? 'wide' : 'tall'      
      loading = false;
      currentSrc = src
      onImageLoad && onImageLoad({success: true, image: {width: imgW, height: imgH, preference}})
    }

    _img.onerror = function () {
      imgW = null;
      imgH = null;
      preference = null;
      loading = false;
      currentSrc = null;
      onImageLoad && onImageLoad({success: false})
    }

    _img.src = src    
  }

  $:style = imgW && imgH ? `width: ${imgW}px; height: ${imgH}px` : ''

  $: {
    currentSrc !== src && loadImage()
  }

</script>

<div class='smart-image' {style} on:click={() => {onClick && onClick()}} class:clickable={!!onClick} class:rounded={rounded} class:shadow={shadow}>  
  {#if loading}
    Loading...
  {:else}
    {#if !!currentSrc}
      <img class={`${preference}`} src={currentSrc} alt={alt || currentSrc}  />  
    {:else}
      Error
    {/if}
  {/if}  
</div>

<style lang="scss" scoped>  
  .smart-image{
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin: auto;

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
      &.wide{
        width: 100%;
        height: auto;
      }    
      &.tall{
        height: 100%;
        width: auto;
      }  
    }    
  }
</style>
