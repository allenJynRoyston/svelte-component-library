<script lang='ts'>
  //--------------------------- IMPORTS  
  import {Form, SVG} from '../../index'

  //--------------------------- COMPONENT PROPS
  export let post;
  export let author;
  export let isMine;
  export let cardFunctions;
  export let props;

  //---------------------------

  //--------------------------- VARS
  let formData = [
    {
      renderAs: 'textarea', 
      key: props.postId,      
      value: post.content,
      required: true,
      contentEdit: true,
    }    
  ]

  const formProps = {
    formData,
    onSubmit: cardFunctions.onSubmit,
    padding: 20,
    localStorageKey: 'postid',
    clearLocalStorage: true
  }      
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
      <Form {...formProps} isBusy={props.isSaving} style={'border: none'} />
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