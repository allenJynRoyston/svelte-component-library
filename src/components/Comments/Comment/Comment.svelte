<script lang='ts'>
  //--------------------------- IMPORTS  
  import {tick, getContext} from 'svelte'  
  import {
    CommentContainer, UserFetcher, 
    Button, 
    CommentHeader, CommentContent, CommentEmotes
  } from '../../index'
 
  //--------------------------- COMPONENT PROPS
  export let comment;
  export let events; 
  export let index;
  export let level;

  if(level != null){level++}  
  //---------------------------

  //--------------------------- VARS 
  const loggedIn = getContext('loggedIn')
  const myDetails = getContext('myDetails') 

  let author = null;
  let isMine;

  let state = {
    render: true
  }

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
        toggleEdit: () => {   
          // @ts-ignore
          events!.comments && events.comments.toggleEdit(index)
        },      
        updateEmoji: async(emoji) => {           
          // first, remove one from the count
          let current = comment.emotes.myEmote
          comment.emotes[current].count --
    
          // add to the new one
          comment.emotes.myEmote = emoji      
          comment.emotes[emoji].count ++

          updateComment(comment)
        },        
        onSubmit: async(data) => {
          comment.content = data[0].value
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
        showInTray: true,
        showInSidebar: true,       
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
  const updateComment = async(c) => {    
    state.render = false
    events!.comments && await events.comments.update({id: c._id, comment: c})
    state.render = true
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
      props: comment.props,
  }

  //---------------------------
</script>

{#if state.render}

  <UserFetcher id={comment.authorId} onComplete={fetchUser} />

  <div class='comment'>
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
    <CommentEmotes  {...props} /> 
  </div>


  {#if comment.props.showComments}    
    <CommentContainer _id={comment._id} target='comments' />
  {/if}

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
</style>