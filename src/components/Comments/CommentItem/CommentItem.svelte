<script lang='ts'>
  //--------------------------- IMPORTS  
  import {
    UserFetcher, 
    CommentHeader, CommentContent, CommentEmotes
  } from '../../index'

  //--------------------------- COMPONENT PROPS
  export let data;

  //---------------------------

  //--------------------------- VARS   
  let user = null;
  let state = {
    userFetchComplete: false,
  }
  //--------------------------- ONMOUNT

  //---------------------------   

  //--------------------------- EVENT HANDLERS
  const appendUserData = (_user) => {
    user = _user
    state.userFetchComplete = true
  }
  //---------------------------

  //--------------------------- $
  //---------------------------
  
</script>
<UserFetcher id={data.authorId} onComplete={appendUserData} />

{#if state.userFetchComplete}
  <div class='comment-item'>  
    <CommentHeader {user} />
    <CommentContent {data} />
    <CommentEmotes {data} />
  </div>
{/if}


<style lang='scss'>
  .comment-item{
    width: calc(100% - 20px);
    padding: 10px;
    background: white;
    color: black;
    border: 1px solid white;
    border-radius: 10px;
    margin-bottom: 10px
  }
</style>