<script lang='ts'>
  //--------------------------- IMPORTS  
  import {CreatePost, SVG} from '../../../index'

  //--------------------------- COMPONENT PROPS
  export let author;
  export let post;
  export let isMine;
  export let options;
  export let checkPermissions;
  export let events;
  export let props;
  //---------------------------

  //--------------------------- VARS    
  //--------------------------- ONMOUNT

  //---------------------------   

  //--------------------------- EVENT HANDLERS

  //---------------------------

  //--------------------------- $
  //---------------------------  
</script>

{#if post}
  <div class='cardbody-container' >
    {#if props.isEditing}
      <CreatePost key={post._id} content={post.content} isBusy={props.isSaving} onSubmit={events.feedItem.onSubmit}/>
    {:else}
      <div contenteditable="false" bind:innerHTML={post.content} />
    {/if}
  </div>

  {#if props.isSaving}
    <div class='cardbody-container__save'>
      <SVG icon={'save'} />
    </div>
  {/if}
{/if}

<style lang='scss'>
  .cardbody-container{
    display: flex;    
    width: 100%;
    position: relative;

    &__save{
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-content: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.75)
    }
  }  
</style>