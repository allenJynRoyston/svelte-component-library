<script lang='ts'>
import { tick, getContext } from 'svelte';

  //--------------------------- IMPORTS  
  import { UserFetcher, PostFetcher, CardHeaderForPosts, CardBodyForPosts, Button, SVG } from '../index'

  //--------------------------- COMPONENT PROPS
  export let data = null;    
  export let index = null;  
  export let feedFunctions = null;  
  //---------------------------

  //--------------------------- VARS
  const loggedIn = getContext('loggedIn')
  const myDetails = getContext('myDetails')  

  let cardState = {
    render: true,
    showDots: false,
    isSaving: false,
    userFetchComplete: false,
    postFetchComplete: false
  }

  let cardData = {
    isMine: null,
    author: {
      _id: null,
      displayName: null,
      imageSrc: null,
      updatedOn: null
    },
    post: {
      _id: null,
      authorId: null,
      content: null, 
      imageSrc: []
    }
  }

  const cardFunctions = {
    toggleShowDots: () => {
      cardState.showDots = !cardState.showDots      
    },
    onInit: (e) => {
      console.log(e)
    },
    onHide: () => {
      cardState.showDots = !cardState.showDots 
      console.log('hide...')
    },
    toggleEdit: () => {      
      cardState.showDots = false;
      feedFunctions && feedFunctions.editItem(index)
      feedFunctions && feedFunctions.blurAllBut(index)
    },
    onSubmit: async(data) => {
      cardState.isSaving = true;
      // @ts-ignore, first save
      const post = feedFunctions && await feedFunctions.onEditSave({id: cardData.post._id, content: data[0].value})
      // fetch post
      appendPostData(post)
      cardState.isSaving = false
      cardState.render = false;
      await tick()
      cardState.render = true
    }
  }

  let options = [
    {name: 'Edit', fn: () => {cardFunctions.toggleEdit()}}
  ]
  //---------------------------


  //--------------------------- FUNCTIONS  
  const appendPostData = (post) => {
    cardData.post = post
    cardState.postFetchComplete = true    
  }   

  const appendUserData = (user) => {  
    cardData.author = user
    // @ts-ignore
    cardData.isMine = loggedIn ? (cardData.post.authorId === myDetails._id) : false
    cardState.userFetchComplete = true
  }   
  //---------------------------

  //--------------------------- $ 
  $: mergedStates = {...cardState, ...data}
  //---------------------------

</script>

{#if cardState.render}

  <!-- THESE JUST FETCH INFORMATION, NEEDS TO BE LOADED IN ORDER (POST -> AUTHOR -> USER) -->
  {#if data && data.postId} 
    <PostFetcher id={data.postId} onComplete={appendPostData} />
  {/if}
  {#if cardState.postFetchComplete} 
    <UserFetcher id={cardData.post.authorId} onComplete={appendUserData} />
  {/if}


  <div class='card-container' class:blur={data && data.isBlurred}>
    <div class='card-container__header'>
      {#if mergedStates.userFetchComplete} 
        <CardHeaderForPosts {...cardData} {cardFunctions} props={mergedStates} />
      {/if}
      <slot name='header'></slot>
    </div>

    <div class='card-container__body'>
      {#if mergedStates.postFetchComplete} 
        <CardBodyForPosts {...cardData} {cardFunctions} props={mergedStates} />
      {/if}
      <slot></slot>
    </div>


    <div class='card-container__footer'>
      <slot name='footer'></slot>
    </div>      

    {#if cardState.showDots}    
      <div class='card-container__overlay' />

      <div class='card-container__options'>
        <div class='card-container__options-btn'>
          <Button onClick={cardFunctions.toggleShowDots} >
            <SVG icon='cross' />
          </Button>
        </div>
        
        <div class='card-container__options-list'>     
          {#each options as {name, fn}}   
            <Button onClick={fn} style={'margin-bottom: 10px; padding: 10px'} >{name}</Button>            
          {/each}
        </div>
      
      </div>    
    {/if}  
  </div>  

{/if}

<style lang='scss'>
  .card-container{
    border: 1px solid black;
    overflow: hidden;
    display: block;
    position: relative;
    min-height: 200px;
    width: 100%;
    

    &__header{
      font-size: 40px;      
    }

    &__footer{
      font-size: 32px;
    }

    &__body{
      padding: 10px; 
    }

    &__overlay{
      position: absolute;
      z-index: 1;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
    }

    &__options{
      position: absolute;
      z-index: 2;
      top: 0;
      right: 0;
      width: calc(200px - 20px);
      padding: 10px;
      height: 100%;      

      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      &-btn{
        position: absolute;
        top: 0;
        right: 0;
      }

      &-list{
        position: absolute;
        top: 40px;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;        
      }      
    }    
  }   
</style>

