<script lang='ts'>
  import { tick, getContext } from 'svelte';
  
    //--------------------------- IMPORTS  
    import { 
      UserFetcher, PostFetcher, 
      FeedItemHeader, 
      FeedItemContent,
      FeedItemFooter,
      CommentContainer, Button
    } from '../../index'
  
    //--------------------------- COMPONENT PROPS
    export let data = null;    
    export let index = null;  
    export let friendStatus = null;
    export let events;
    //---------------------------
  
    //--------------------------- VARS
    const loggedIn = getContext('loggedIn')
    const myDetails = getContext('myDetails') 

    let post = null;
    let author = null;
    let isMine;
  
    let state = {      
      render: true  
    }    
  
    events = {
      ...events,
      feedItem:{      
        toggleShowComments: () => {
          // @ts-ignore
          events && events.feed.toggleShowComments(index)
        },
        toggleShowDots: () => {          
          // @ts-ignore
          events && events.feed.toggleShowDots(index)  
        },
        toggleShowEmojis: () => {
          // @ts-ignore
          events!.feed && events.feed.toggleEmojis(index)
        },
        toggleEdit: () => {   
          // @ts-ignore
          events!.feed && events.feed.toggleEdit(index)
        },      
        updateEmoji: async(emoji) => {           
          // first, remove one from the count
          let current = post.emotes.myEmote
          post.emotes[current].count --
    
          // add to the new one
          post.emotes.myEmote = emoji      
          post.emotes[emoji].count ++          

          updatePost(post)
        },        
        onSubmit: async(data) => {
          post.content = data[0].value
          updatePost(post)
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
        fn: events.feedItem.toggleShowDots
      },     
      {
        name: 'Edit', 
        icon: 'edit', 
        loginRequired: true, 
        ownerRequired: true, 
        showInTray: true,
        showInSidebar: false, 
        fn: events.feedItem.toggleEdit
      },
      {
        name: 'Share', 
        icon: 'share', 
        loginRequired: false, 
        ownerRequired: false, 
        showInTray: true,
        showInSidebar: true,       
        fn: () => {
          events.feed.share(data)
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
          events.feed.report(data)
        }
      }    
    ]
    //---------------------------
  
  
    //--------------------------- FN  
    const updatePost = async(p) => {
      state.render = false
      events!.feed && await events.feed.update({id: p._id, post: p})
      state.render = true
    }

    const fetchPostComplete = (data) => {
      post = data
  
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
              fn: events!.feed && events.feed.share
            }        
          )
        }
      }    
      }   
  
    const fetchUserComplete = (data) => {  
      author = data
      // @ts-ignore
      isMine = loggedIn ? (myDetails._id === post.authorId) : false
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
      post,
      author,
      isMine,
      events,
      options,
      checkPermissions,
      props: data.props,
    }
    //---------------------------
  
</script>



<!-- THESE JUST FETCH INFORMATION, NEEDS TO BE LOADED IN ORDER (POST -> AUTHOR -> USER) -->
{#if data && data._id} 
  <PostFetcher id={data._id} onComplete={fetchPostComplete} />
{/if}
{#if !!post} 
  <UserFetcher id={post.authorId} onComplete={fetchUserComplete} />
{/if}

{#if state.render}

  <div class='card-container' >
    <div class='card-container__header'>
      {#if !!author} 
        <FeedItemHeader {...props} />
      {/if}
      <slot name='header'></slot>
    </div>

    <div class='card-container__body' class:enlarge={data.props.showDots}  >
      {#if !!post} 
        <FeedItemContent {...props} />
      {/if}
      <slot />
    </div>


    <div class='card-container__footer'>
      {#if !!post} 
        <FeedItemFooter  {...props} /> 
      {/if}
      <slot name='footer'></slot>
    </div>      

    {#if data.props.showDots}    
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
  

{#if data.props.showComments}
  <CommentContainer _id={post._id} target='posts' />
{/if}

  <style lang='scss'>
    .card-container{
      border: 1px solid black;
      overflow: hidden;
      display: block;
      position: relative;
      width: calc(100% - 2px);
      border-radius: 5px;

      &.blur{
        filter: blur(5px);
      }
      
      &__header{
        width: auto;
      }
  
      &__body{
        padding: 20px 10px; 
        &.enlarge{
          min-height: 100px
        }
      }
  
      &__footer{
        width: auto;
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
  </style>
  
  