<script lang='ts'>
  import {getContext} from 'svelte';

  export let name = 'John Smith';
  export let image = null;
  export let bgColor = null;
  export let props = null;

  const theme:string = getContext('theme')

  $: style = !!bgColor ? `background: ${bgColor}` : null;

</script>

<div class={`profile-card ${theme}-theme`}  {style} >
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
    border: 1px solid var(--black-1);
    min-width: 100px;
        
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    &.dark-theme{
      border: 1px solid white;
    }

    .image{      
      width: 50px;
      height: 50px;
      border: 1px solid black;
      border-radius: 50%;

      @include desktop-and-up {
        width: 100px;
        height: 100px;
      }      
    }
  }
</style>