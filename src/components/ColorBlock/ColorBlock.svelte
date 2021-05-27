<script lang='ts'>
  export let name = '';
  export let image = null;
  export let bgColor = null;
  export let textColor = null;
  export let props = null;
  export let index = null;

  $: style = !!bgColor ? `background: ${bgColor}; color: var(${textColor})` : null;
</script>

<div class='color-block'  {style} >
  <h3>{name}</h3>
</div>

<style lang='scss'>
  @import "../../scss/src/_media-queries.scss";

  .color-block{
    width: 100%;
    height: 100%;
    min-width: 100px;   
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
  }
</style>