<script>
  export let src;
  export let alt;

  $: imageStyle = `background: url('${src}'); center center no-repeat; background-size: cover; width: 100%; height: 100%;`
</script>

<div class='image-container' style={imageStyle} {alt} />

<style lang="scss" scoped>  
  .image-container{
    width: 100%;
    height: 100%;    
    overflow: hidden;      
  }
</style>
