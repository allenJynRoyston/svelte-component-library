<script lang='ts'>
  //--------------------------- IMPORTS  
  import {CreatePost, SVG, MoodPortrait} from '../../../index'

  //--------------------------- COMPONENT PROPS
  export let author;
  export let isMine;
  export let events;
  export let props;
  export let options;
  export let comment;
  export let checkPermissions;
  
  //---------------------------

  //--------------------------- VARS   
  const formProps = {
    formData: [
      {
        renderAs: 'textarea', 
        key: comment._id,      
        value: comment.content,
        required: true,
        contentEdit: true,
      }    
    ],
    onSubmit: events.comment.onSubmit,
    padding: 20,
    localStorageKey: 'commentId',
    clearLocalStorage: true
  }      

  
  //--------------------------- ONMOUNT

  //---------------------------   


  //--------------------------- $
  //---------------------------
</script>

{#if comment}
  <div class='comment-content' >
    {#if props.isEditing}
      <CreatePost key={comment._id} content={comment.content} currentEmotion={comment.currentEmotion} isBusy={props.isSaving} onSubmit={events.comment.onSubmit} />
    {:else}
      <div style='display: flex'>
        {#if author && comment.currentEmotion}
          <MoodPortrait userId={author._id} currentEmotion={comment.currentEmotion}/>
        {/if}
        <div contenteditable="false" bind:innerHTML={comment.content} />
      </div>

    {/if}
  </div>

  {#if props.isSaving}
    <div class='comment-content__save'>
      <SVG icon={'save'} />
    </div>
  {/if}
{/if}

<style lang='scss' scoped>
  .comment-content{
    display: flex;    
    width: 100%;
    position: relative;
    padding: 20px 0;

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