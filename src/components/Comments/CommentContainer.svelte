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
  let comment = {    
    allComments: {
      cids: [],
      count: null
    },
    myComments: {
      cids: [],
      count: null      
    },
    count: null    
  }
  let isReady = false
  let initialAmount = 4;
  let fetchAmount = 10

  events = {
    ...events,
    commentContainer: {
      // add to upper most level events
    }
  }
  //---------------------------       

  //--------------------------- ONMOUNT
  onMount(async() => {
    await fetchCommentData()
    await fetchAllComments(0, initialAmount)
    await fetchMyComments(0, initialAmount)
    isReady = true
  })
  //---------------------------  

  //--------------------------- FN
  const fetchCommentData = async() => {
    // @ts-ignore
    let res = await indexdb.getAll(target)
    let filtered = res.filter(x => x._id ===  _id)[0]
    let items = filtered.comments     

    items.myComments.cids = []  //items.myComments.cids.splice(0, initialAmount)
    items.allComments.cids = [] //items.allComments.cids.splice(0, initialAmount)

    comment = {...items}    
  }

  const fetchAllComments = async(startAt = comment.allComments.cids.length, amount = fetchAmount) => {
    // @ts-ignore
    let res = await indexdb.getAll(target)
    let filtered = res.filter(x => x._id ===  _id)[0]
    let cids = filtered.comments.allComments.cids.splice(startAt, amount);

    comment.allComments.cids = startAt === 0 ? cids : [...comment.allComments.cids, ...cids]
  }  

  const fetchMyComments = async(startAt = comment.myComments.cids.length, amount = fetchAmount) => {
    // @ts-ignore
    let res = await indexdb.getAll(target)
    let filtered = res.filter(x => x._id ===  _id)[0]
    let cids = filtered.comments.myComments.cids.splice(startAt, amount);

    comment.myComments.cids = startAt === 0 ? cids : [...comment.myComments.cids, ...cids]
  }    

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
    {#if comment.myComments.count > 0}
      <Comments commentIds={comment.myComments.cids} {events} {level}  />
      {#if comment.myComments.cids.length < comment.myComments.count}
        <button on:click={() => {fetchMyComments()}}>Fetch more...</button>
      {/if}
    {/if}

    {#if comment.myComments.count > 0 && comment.allComments.count > 0}
      <hr>
    {/if} 

    {#if comment.allComments.count > 0}
      <Comments commentIds={comment.allComments.cids} {events} {level}  />

      {#if comment.allComments.cids.length < comment.allComments.count}
        <button on:click={() => {fetchAllComments()}}>Fetch more...</button>
      {/if}
    {/if}
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