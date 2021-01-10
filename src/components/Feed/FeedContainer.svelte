<script lang='ts'>
  //--------------------------- IMPORTS
  import {onMount, getContext} from 'svelte'
  import {UserFetcher, Feed} from '../index'
  
  //--------------------------- STATE
  export let feedOwnerId = null;  
  export let friendStatus = null;
  export let events = {};
  export let state = {};

  //--------------------------- VARS
  const indexdb = getContext('indexdb')      
  let feedData = []  
  let isReady = false
  let feedOwner = null

  events = {
    ...events,
    feedContainer: {
      // add to upper most level events
    }    
  }

  //--------------------------- ONMOUNT
  onMount(async() => {
    // @ts-ignore
    let res = await indexdb.getAll('posts')
    feedData = res.filter(x => x.authorId === feedOwnerId).map(x => {
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
    isReady = true;
  })
  //---------------------------

  //--------------------------- FUNCTIONS  
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
{/if}