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
      <Button size='small' {...buttonOne} />
    {/if}
    {#if buttonTwo}
      <Button size='small' {...buttonTwo} />
    {/if}      
  </div>
</div>

<style lang='scss'>
  @import "../../scss/src/_media-queries.scss";

  .splash{
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;    
    background: transparent;
    color: var(--white-0-text);

    @include desktop-and-up {
      padding: 50px 0;
    }    

    &.dark-theme{
      color: var(--black-0-text);
    }    

    .title{
      font-size: 24px;
      @include desktop-and-up {
        font-size: 72px;
      }
      margin-bottom: 10px;
    }

    .buttons{
      display: flex;
      gap: 10px;
    }    

  }
</style>

