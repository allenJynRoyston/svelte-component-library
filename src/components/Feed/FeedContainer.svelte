<script lang='ts'>
  //--------------------------- IMPORTS
  import {onMount, getContext} from 'svelte'
  import {UserFetcher, Feed, CreatePost, UserPortrait} from '../index'
  
  //--------------------------- STATE
  export let feedOwnerId = null;  
  export let friendStatus = null;
  export let events = {};
  export let state = {};

  //--------------------------- VARS
  const indexdb = getContext('indexdb')    
  const myDetails = getContext('myDetails')  
  const loggedIn = getContext('loggedIn')

  let isReady = false
  let feedData = []  
  let feedOwner = null
  let initialAmount = 5;
  let fetchAmount = 10
  let totalInFeed;


  events = {
    ...events,
    feedContainer: {
      fetchMore: () => {

      }
      // add to upper most level events
    }    
  }

  //--------------------------- ONMOUNT
  onMount(async() => {
    totalInFeed = await fetchPostCount()
    await fetchPosts(0, initialAmount)
    isReady = true;
  })
  //---------------------------

  //--------------------------- FUNCTIONS  
  const fetchPostCount = async() => {
    // @ts-ignore
    let res = await indexdb.getAll('posts')
    let filtered = res.filter(x => x.authorId === feedOwnerId)
    return filtered.length  
  }

  const fetchPosts = async(startAt = feedData.length, amount = fetchAmount) => {
    // @ts-ignore
    let res = await indexdb.getAll('posts')
    let filtered = res.filter(x => x.authorId === feedOwnerId).map(x => {
      x.props = {
        showComments: false,
        showEmojis: false,
        showDots: false,
        showEmotions: false,
        showReply: false,

        isCreating: false,
        isSaving: false,
        isBlurred: false,
        isEditing: false      
      }      
      return x
    }) 

    filtered = filtered.length > amount ? filtered.splice(startAt, amount) : filtered
    feedData = startAt === 0 ? filtered : [...feedData, ...filtered]        
  }

  const postToFeed = (post) => {
    if(feedOwnerId === myDetails._id){
      console.log("owner")
    }
    else{
      console.log('somebody else')
    }
    return null;
  }  

  const fetchUser = (user) => {  
    feedOwner = user
  }   
  //---------------------------

</script>



<p style='text-align: center'>
  {#if feedOwner}
    <strong>- {`${feedOwner.firstName} ${feedOwner.lastName}`} -</strong>
    <br>
    <small>Friendship status: <strong>{!!friendStatus ? `${friendStatus} 🤗` : "Not friends"}</strong></small>
  {/if}
</p>


{#if feedOwnerId} 
  <UserFetcher id={feedOwnerId} onComplete={fetchUser} />  
{/if}

<div class='feed-container'>

  {#if loggedIn && feedOwner}
    <div class='feed-container__post'>

        <CreatePost content={''} isBusy={''} onSubmit={postToFeed} allowMood={true} showUser={false} requireClickToActivate={true} >

        <div slot='header' style='display: flex'>
          <UserPortrait userId={feedOwner._id} style={'margin-right: 10px'} />      
          <p>{feedOwnerId === myDetails._id ? 'Post something:' : `Leave ${feedOwner.firstName} a message:`}</p>
        </div>

        Reply
      </CreatePost>
    </div>
  {/if}

  {#if isReady}
    <div class='feed-container__feed'>

      <!-- <div class='feed-container__overlay' /> -->


      <Feed {feedData} {friendStatus} {events} />

      {#if feedData.length < totalInFeed}
        <button on:click={() => {fetchPosts()}} >({feedData.length}/{totalInFeed}) Fetch More...</button>
      {/if}
    </div>
  {/if}

</div>

<style lang='scss'>
  .feed-container{

    &__post{
      position: relative;
      width: calc(100% - 2px); 
      border: 1px solid black; 
      margin-bottom: 20px      
    }

    &__feed{
      position: relative;
      width: 100%; 
      margin-bottom: 20px;
    }    

    &__overlay{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        background: rgba(0, 0, 0, .5);
        backdrop-filter: blur(2px);
        z-index: 3;
        overflow: hidden;
      }    
  }
</style>