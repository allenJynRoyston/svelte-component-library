<script lang='ts'>
  //--------------------------- IMPORTS
  import {onMount, getContext} from 'svelte'
  import {UserFetcher, FeedLogic} from '../index'
  
  //--------------------------- STATE
  export let feedOwnerId = null;  
  export let friendStatus = null;

  //--------------------------- VARS
  const indexdb = getContext('indexdb')    
  let feedData = []  
  let isReady = false
  let feedOwner = null

  //--------------------------- ONMOUNT
  onMount(async() => {
    // @ts-ignore
    feedData = await indexdb.getAll('posts')
    feedData = feedData.filter(x => x.authorId ===  feedOwnerId).map(x => {
      x.postId = x._id
      return x
    })
    isReady = true;
  })
  //---------------------------

  //--------------------------- FUNCTIONS  
  const appendUserData = (user) => {  
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
  <UserFetcher id={feedOwnerId} onComplete={appendUserData} />
{/if}


{#if isReady}
  <FeedLogic data={feedData} {friendStatus} />
{/if}