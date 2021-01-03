<script lang='ts'>
import { tick, getContext } from 'svelte';

  //--------------------------- IMPORTS  
  import { 
    UserFetcher, PostFetcher, 
    CardHeaderForPosts, CardBodyForPosts, CardFooterForPosts, 
    Comments, Button
  } from '../index'

  //--------------------------- COMPONENT PROPS
  export let data = null;    
  export let index = null;  
  export let friendStatus = null;
  export let feedFunctions = null;  
  //---------------------------

  //--------------------------- VARS
  const loggedIn = getContext('loggedIn')
  const myDetails = getContext('myDetails')  

  let cardState = {
    render: true,
    showExtraEmojis: false,    
    showDots: false,
    showComments: false,
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
      updatedOn: null, 
    },
    post: {
      allowComments: {},
      allowEmotes: {},
      allowShare: {},
      authorId: null,
      comments: {},     
      content: null, 
      _id: null,
      emotes: {
        myEmote: null
      },
      updatedOn: null,
      version: null,                  
    }
  }

  const cardFunctions = {
    onInit: (e) => {
      console.log(e)
    },
    onHide: () => {
      cardState.showDots = !cardState.showDots 
      console.log('hide...')
    },  
    share: () => {     
      alert("share")
    }, 
    report: () => {     
      alert("report")
    },        
    toggleShowComments: () => {
      // cardState.showComments = !cardState.showComments            
      feedFunctions && feedFunctions.blurAllBut(index)
      feedFunctions && feedFunctions.toggleShowComments(index)
    },
    toggleShowDots: () => {
      cardState.showDots = !cardState.showDots      
    },
    toggleShowEmojis: () => {
      cardState.showExtraEmojis = !cardState.showExtraEmojis
    },
    toggleEdit: () => {     
      cardState.showDots = false;
      feedFunctions && feedFunctions.editItem(index)
      feedFunctions && feedFunctions.blurAllBut(index)
    },      
    updateEmoji: async(emoji) => {           
      // first, remove one from the count
      let current = cardData.post.emotes.myEmote
      cardData.post.emotes[current].count --

      // add to the new one
      cardData.post.emotes.myEmote = emoji      
      cardData.post.emotes[emoji].count ++
      updatePost(cardData.post)
    },        
    onSubmit: async(data) => {
      cardData.post.content = data[0].value
      updatePost(cardData.post)
    }
  }

  const updatePost = async(p) => {
      cardState.isSaving = true;      
      // @ts-ignore, first updates and saves
      const post = feedFunctions && await feedFunctions.update({id: p._id, post: p})
      // then refetches
      appendPostData(post)
      cardState.isSaving = false
      cardState.render = false;
      await tick()
      cardState.render = true
  }

  let options = [
    {
      name: 'Back', 
      icon: 'arrow-left', 
      loginRequired: false,
      ownerRequired: false,
      showInTray: false,
      showInSidebar: true,
      fn: cardFunctions.toggleShowDots
    },     
    {
      name: 'Edit', 
      icon: 'edit', 
      loginRequired: true, 
      ownerRequired: true, 
      showInTray: true,
      showInSidebar: false, 
      fn: cardFunctions.toggleEdit
    },
    {
      name: 'Report', 
      icon: 'warning', 
      loginRequired: false, 
      ownerRequired: false, 
      showInTray: false,
      showInSidebar: true,       
      fn: cardFunctions.report
    }    
  ]
  //---------------------------


  //--------------------------- FUNCTIONS  
  const appendPostData = (post) => {
    cardData.post = post

    if(post.allowShare.anybody || (post.allowShare.friends && friendStatus === 'friend') ){
      if(options.filter(x => x.name === 'Share').length === 0){
        options.push(
          {
            name: 'Share', 
            icon: 'share', 
            loginRequired: false, 
            ownerRequired: false, 
            showInTray: true,
            showInSidebar: true, 
            fn: cardFunctions.share
          }        
        )
      }
    }    

    cardState.postFetchComplete = true    
  }   

  const appendUserData = (user) => {  
    cardData.author = user
    // @ts-ignore
    cardData.isMine = loggedIn ? (cardData.post.authorId === myDetails._id) : false
    cardState.userFetchComplete = true
  }  
    
  const checkPermissions = (loginRequired, ownerRequired) => {        
    let state = loginRequired ? (loggedIn ? true : false) : true            
        state = ownerRequired ? (cardData.isMine ? true : false) : state        
    return state
  }     

  const buttonStyle = 'width: 100%; margin-bottom: 10px; padding: 10px'
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
        <CardHeaderForPosts {...cardData} {cardFunctions} {options} {checkPermissions} props={mergedStates} />
      {/if}
      <slot name='header'></slot>
    </div>

    <div class='card-container__body' class:enlarge={cardState.showDots} >
      {#if mergedStates.postFetchComplete} 
        <CardBodyForPosts {...cardData} {cardFunctions} props={mergedStates} />
      {/if}
      <slot />
    </div>


    <div class='card-container__footer'>
      {#if mergedStates.postFetchComplete} 
        <CardFooterForPosts  {...cardData} {cardFunctions} props={mergedStates} />
      {/if}
      <slot name='footer'></slot>
    </div>      

    {#if cardState.showDots}    
      <div class='card-container__overlay' />

      <div class='card-container__options'>
        <div class='card-container__options-list'>     
          {#each options as {name, showInSidebar, loginRequired, ownerRequired, fn}}   
            {#if checkPermissions(loginRequired, ownerRequired) && showInSidebar }
              <Button onClick={fn} style={buttonStyle}>
                {name}
              </Button>            
            {/if}
          {/each}
        </div>
      </div>    
    {/if}  
  </div>  
{/if}

{#if data.showComments}
  <Comments data={cardData.post.comments} />
{/if}

<style lang='scss'>
  .card-container{
    border: 1px solid black;
    overflow: hidden;
    display: block;
    position: relative;
    width: 100%;
    
    &__header{
      width: auto;
    }

    &__body{
      padding: 20px 10px; 
      &.enlarge{
        min-height: 80px
      }
    }

    &__footer{
      width: auto;
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
      background: white; 
      border-left: 1px solid black;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;


      &-list{
        position: absolute;
        top: 0px;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: calc(100% - 20px);
        padding: 10px;
      }      
    }    
  }   
</style>

