<script>
  //--------------------------- IMPORTS
  import {onMount, getContext} from 'svelte'
  import {UserFetcher} from '../index'

  import FeedLogic from './FeedLogic/FeedLogic.svelte'

  //--------------------------- STATE
  export let feedOwnerId = null;  

  //--------------------------- VARS
  const loggedIn = getContext('loggedIn')
  const myDetails = getContext('myDetails')
  const indexdb = getContext('indexdb')
    
  let feedData = []  
  let isReady = false
  let feedOwner = null
  

  //--------------------------- ONMOUNT
  onMount(async() => {
    feedData = loggedIn ? await indexdb.getAll('posts') : []
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



<p>
  {#if feedOwner}
    <strong>- {`${feedOwner.firstName} ${feedOwner.lastName}`} -</strong>
  {/if}
</p>


{#if feedOwnerId} 
  <UserFetcher id={feedOwnerId} onComplete={appendUserData} />
{/if}


{#if isReady}
  <FeedLogic data={feedData} />
{/if}