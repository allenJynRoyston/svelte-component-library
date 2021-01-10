<script lang='ts'>
  //--------------------------- IMPORTS  
  import {onMount, getContext} from 'svelte'
  import {Comments} from '../index'
  //---------------------------
 
  //--------------------------- COMPONENT PROPS
  export let _id;
  export let target = 'posts'
  export let level = 0;
  export let events = {};
  export let state = {};

  //--------------------------- VARS
  const indexdb = getContext('indexdb')    
  let postComments = {    
    myCommentId: [],
    commentIds: [],    
    count: null    
  }
  let isReady = false

  events = {
    ...events,
    commentContainer: {
      // add to upper most level events
    }
  }
  //---------------------------       

  //--------------------------- ONMOUNT
  onMount(async() => {
    // @ts-ignore
    let res = await indexdb.getAll(target)
    res = res.filter(x => x._id ===  _id)

    if(res.length > 0){
      postComments = {...res[0].comments}
    }

    isReady = true
  })
  //---------------------------  

  //--------------------------- EVENT HANDLERS
  const levelClass = () => {
    switch(level){
      case 1:
        return 'border-left: 3px solid red'
      case 2:
        return 'border-left: 3px solid blue'        
      case 3:
        return 'border-left: 3px solid green'    
      default:
        return 'border: 1px solid black;'
    }
  }  
  //---------------------------

  //--------------------------- $
  //---------------------------
  
</script>

{#if isReady}

  <div class='comments' style={levelClass()}>  
    <Comments commentIds={postComments.myCommentId} {events} {level} />

    {#if postComments.myCommentId.length > 0 && postComments.commentIds.length > 0}
      <hr>
    {/if} 

    <Comments commentIds={postComments.commentIds} {events} {level} />
  </div>

 {/if}


<style lang='scss'>
  .comments{
    width: calc(100% - 20px);
    margin-top: 10px;
    padding: 10px;
    background: lightgrey;

    hr{
      border: none;
      border-top: 1px solid black;      
      margin-bottom: 10px
    }
  }

</style>