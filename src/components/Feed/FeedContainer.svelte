<script lang='ts'>
  //--------------------------- IMPORTS
  import {onMount, getContext} from 'svelte'
import App from '../App/App.svelte';
  import {UserFetcher, Feed} from '../index'
  
  //--------------------------- STATE
  export let feedOwnerId = null;  
  export let friendStatus = null;
  export let events = {};
  export let state = {};

  //--------------------------- VARS
  const indexdb = getContext('indexdb')      
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
        
        isSaving: false,
        isBlurred: false,
        isEditing: false      
      }      
      return x
    }) 

    filtered = filtered.length > amount ? filtered.splice(startAt, amount) : filtered
    feedData = startAt === 0 ? filtered : [...feedData, ...filtered]        
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


{#if isReady}
  <Feed {feedData} {friendStatus} {events} />

  {#if feedData.length < totalInFeed}
    <button on:click={() => {fetchPosts()}} >({feedData.length}/{totalInFeed}) Fetch More...</button>
  {/if}
{/if}