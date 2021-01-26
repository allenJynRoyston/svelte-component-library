<script lang='ts'>
  //--------------------------- IMPORTS  
  import {getContext} from 'svelte'  

  import CommentContainer from '../CommentContainer.svelte'
  import UserFetcher from '../../Fetcher/UserFetcher.svelte'
  import Button from '../../Button/Button.svelte'
  import CreatePost from '../../CreatePost/CreatePost.svelte'
  import CommentHeader from './Parts/CommentHeader.svelte'
  import CommentContent from './Parts/CommentContent.svelte'
  import CommentFooter from './Parts/CommentFooter.svelte'

 
  //--------------------------- COMPONENT PROPS
  export let comment;
  export let events; 
  export let index;
  export let level;
  export let last;

  if(level != null){level++}  
  //---------------------------

  //--------------------------- VARS 
  const loggedIn = getContext('loggedIn')
  const myDetails = getContext('myDetails') 

  let author = null;
  let isMine;
  let render = true;
  
  events = {
    ...events,
    comment:{       
      toggleShowComments: () => {
          // @ts-ignore
          events!.comments && events.comments.toggleShowComments(index)
        },
        toggleShowDots: () => {    
          // @ts-ignore
          events!.comments && events.comments.toggleShowDots(index)  
        },
        toggleShowEmojis: () => {          
          // @ts-ignore
          events!.comments && events.comments.toggleEmojis(index)
        },
        toggleShowEmotions: () => {          
          // @ts-ignore
          events!.comments && events.comments.toggleShowEmotions(index)
        },        
        toggleReply: () => {          
          // @ts-ignore
          events!.comments && events.comments.toggleReply(index)
        },          
        toggleEdit: () => {   
          // @ts-ignore
          events!.comments && events.comments.toggleEdit(index)
        },  
        createNewComment: ({value:content, mood:currentEmotion, permissions}) => {
          let newComment = {
            refId: comment._id, 
            // @ts-ignore
            authorId: myDetails._id, 
            content,
            permissions,            
            currentEmotion,   
          }

          events!.comments && events.comments.createNewComment({comment: newComment, index})          
        },   
        updateEmoji: async(emoji) => {    
          // first, remove one from the count
          let current = comment.emotes.myEmote
          comment.emotes[current].count --
    
          // add to the new one
          comment.emotes.myEmote = emoji      
          comment.emotes[emoji].count ++

          updateComment(comment, true)
        },  
        updateEmote: (emote) => {
          comment.currentEmotion = emote
          updateComment(comment)
        },     
        onSubmit: async({mood:currentEmotion, permissions, value:content}) => {
          comment.currentEmotion = currentEmotion
          comment.permissions = permissions
          comment.content = content
          updateComment(comment)
        }
    }
  }

  let options = [
      {
        name: 'Back', 
        icon: 'arrow-left', 
        loginRequired: false,
        ownerRequired: false,
        showInTray: false,
        showInSidebar: true,
        fn: events.comment.toggleShowDots
      },     
      {
        name: 'Edit', 
        icon: 'edit', 
        loginRequired: true, 
        ownerRequired: true, 
        showInTray: true,
        showInSidebar: false, 
        fn: events.comment.toggleEdit
      },
      {
        name: 'Share', 
        icon: 'share', 
        loginRequired: false, 
        ownerRequired: false, 
        showInTray: (loggedIn && comment.permissions.allowShare.friends) || (!loggedIn && comment.permissions.allowShare.anybody),
        showInSidebar: (loggedIn && comment.permissions.allowShare.friends) || (!loggedIn && comment.permissions.allowShare.anybody),
        fn: () => {
          events.comments.share(comment)
        }
      },        
      {
        name: 'Report', 
        icon: 'warning', 
        loginRequired: false, 
        ownerRequired: false, 
        showInTray: false,
        showInSidebar: true,       
        fn: () => {
          events.comments.report(comment)
        }
      }    
    ]    

  
  //--------------------------- FN
  const updateComment = async(c, reRender = false) => {    
    if(reRender){
      render = false
    }
    events!.comments && await events.comments.update({id: c._id, comment: c})
    if(reRender){
      render = true
    }    
  }
    
  const fetchUser = (data) => {
    author = data;
    // @ts-ignore
    isMine = loggedIn ? (myDetails._id === comment.authorId) : false
  }

  const checkPermissions = (loginRequired, ownerRequired) => {        
    let state = loginRequired ? (loggedIn ? true : false) : true            
        state = ownerRequired ? (isMine ? true : false) : state        
    return state
  }       

   const buttonStyle = 'width: 100%; margin-bottom: 10px; padding: 10px'
  //---------------------------   

  //--------------------------- $
  $: props = {
      comment,
      author, 
      isMine,     
      events,
      options,
      checkPermissions,
      props: comment.props
  }

  //---------------------------
</script>

<UserFetcher id={comment.authorId} onComplete={fetchUser} />



  <div class='comment' class:isLast={last} class:hasExtension={comment.props.showReply} >
    {#if comment.props.showDots}
      <div class='comment__overlay' on:click={events.comment.toggleShowDots} />
    {/if}

    {#if comment.props.showDots}    
      <div class='comment__options'>
        <div class='comment__options-list'>     
          {#each options as {name, showInSidebar, loginRequired, ownerRequired, fn}}   
            {#if checkPermissions(loginRequired, ownerRequired) && showInSidebar }
              <Button onClick={fn} style={buttonStyle} >
                {name}
              </Button>            
            {/if}
          {/each}
        </div>
      </div>  
    {/if}    

    {#if !!author}
      <CommentHeader {...props} />
    {/if}
    
    <CommentContent  {...props} />

    {#if render}
      <CommentFooter  {...props} /> 
    {/if}
  </div>



{#if comment.props.showReply}
  <div class='replay-container'>
    <CreatePost content={''} isBusy={comment.props.isCreating} onSubmit={events.comment.createNewComment} allowMood={true}>
      Reply
    </CreatePost>
  </div>
{/if}


{#if comment.props.showComments}    
  <CommentContainer _id={comment._id} target='comments' />
{/if}



<style lang='scss'>
  .comment{
    position: relative;
    width: calc(100% - 20px);
    padding: 10px;
    background: white;
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;

    &.hasExtension{
      border-radius: 10px 10px 0 0;      
      margin-bottom: 0;
    }

    &.isLast{
      margin-bottom: 0px;
    }

    &__overlay{
      position: absolute;
      z-index: 3;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
    }

    &__options{
      position: absolute;
      z-index: 5;
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

  .replay-container{
    background: white;
    padding: 10px;
    border-radius: 0 0 10px 10px;
    margin-bottom: 20px;
  }
</style>