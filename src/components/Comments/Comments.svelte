<script lang='ts'>
  //--------------------------- IMPORTS  
  import {CommentItem, CommentFetcher} from '../index'

  //--------------------------- COMPONENT PROPS
  export let data;
  


  //---------------------------

  //--------------------------- VARS   
  const {myCommentId, commentIds} = data;
  const myComments = []
  const allComments = []
  let commentState = {
    myCommentsComplete: false,
    allCommentsComplete: false
  }
  
  //--------------------------- ONMOUNT

  //---------------------------   

  //--------------------------- EVENT HANDLERS
  const appendMyComments = (data) => {
    myComments.push(data)
    commentState.myCommentsComplete = myComments.length === myCommentId.length
  }

  const appendAllComments = (data) => {
    allComments.push(data)
    commentState.allCommentsComplete = allComments.length === commentIds.length
  }
  //---------------------------

  //--------------------------- $
  //---------------------------
  
</script>


{#each myCommentId as id}
  <CommentFetcher {id} onComplete={appendMyComments} />
{/each}

{#each commentIds as id}
  <CommentFetcher {id} onComplete={appendAllComments} />
{/each}  


<div class='comments'>  

  {#if commentState.myCommentsComplete}
    {#each myComments as comment}
      <CommentItem data={comment} />      
    {/each}
  {/if}

  {#if commentState.myCommentsComplete && commentState.allCommentsComplete}
    {#if myComments.length > 0 && allComments.length > 0}
      <hr>
    {/if} 
  {/if}


  {#if commentState.allCommentsComplete}
    {#each allComments as comment}
      <CommentItem data={comment} />    
    {/each}
  {/if}

  
  </div>

<style lang='scss'>
  .comments{
    width: calc(100% - 20px);
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
    background: lightgrey;

    hr{
      border: none;
      border-top: 1px solid white;      
      margin-bottom: 10px
    }
  }

</style>