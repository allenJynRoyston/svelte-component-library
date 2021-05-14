<script lang='ts'>
  import Button from '../Button/Button.svelte'

  export let title = 'Splash Title';
  export let buttonOne = null;
  export let buttonTwo = null;

</script>

<div class={`root-component splash`}>
  <h5 class='title'>{title}</h5>  
  <div class='buttons'>
    {#if buttonOne}
      <Button {...buttonOne} />
    {/if}
    {#if buttonTwo}
      <Button {...buttonTwo} />
    {/if}      
  </div>
</div>

<style lang='scss'>
  @import "../../scss/src/_media-queries.scss";

  .splash{
    width: 100%;
    padding: 50px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;    
    background: transparent;
    color: var(--white-0-text);

    &.dark-theme{
      color: var(--black-0-text);
    }    

    .title{
      font-size: 32px;
      @include desktop-and-up {
        font-size: 72px;
      }
    }

    .buttons{
      display: flex;
      gap: 10px;
    }    

  }
</style>

