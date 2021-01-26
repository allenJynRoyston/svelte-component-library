<script lang='ts'>
  //--------------------------- IMPORTS    
  import CreatePost from '../../../CreatePost/CreatePost.svelte'
  import MoodPortrait from '../../../MoodPortrait/MoodPortrait.svelte'
  import SVG from '../../../SVG/SVG.svelte'

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
      <CreatePost key={post._id} content={post.content} permissions={post.permissions} currentEmotion={post.currentEmotion} isBusy={props.isSaving} onSubmit={events.feedItem.onSubmit} showUser={true} allowMood={true} />
    {:else}
      <div style='display: flex'>
        {#if author && post.currentEmotion}
          <MoodPortrait userId={author._id} currentEmotion={post.currentEmotion}/>
        {/if}
        <div contenteditable="false" bind:innerHTML={post.content} />
      </div>
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