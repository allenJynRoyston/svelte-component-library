<script lang='ts'>
  export let name = '';
  export let image = null;
  export let bgColor = null;
  export let textColor = null;
  export let props = null;
  export let index = null;


  $: style = !!bgColor ? `background: ${bgColor}; color: var(${textColor})` : null;

</script>

<div class={`root-component profile-card`}  {style} >
  <div class='image'>

  </div>
  <h3>{name}</h3>
</div>

<style lang='scss'>
  @import "../../scss/src/_media-queries.scss";

  .profile-card{
    width: calc(100% - 20px);
    height: 200px;
    padding: 10px;
    // border: 1px solid var(--black-1);
    min-width: 100px;
        
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    &.dark-theme{
      // border: 1px solid white;
    }

  }
</style>