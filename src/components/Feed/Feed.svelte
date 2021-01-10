<script lang='ts'>
  //--------------------------- IMPORTS  
  import {getContext} from 'svelte'
  import {FeedItem} from '../index'


  //--------------------------- COMPONENT PROPS
  export let feedData = []  
  export let friendStatus;
  export let events; 
  //---------------------------

  //--------------------------- APP CONTEXT   
  const updatePostById = getContext('updatePostById')  
  //---------------------------    

  //--------------------------- VARS

  events = {
    ...events,
    feed:{
      share: (post) => {     
        console.log(post)
        alert('share')
      }, 
      report: () => {     
        alert("report")
      },        
      update: async({post}) => {
        feedData = feedData.map((x, i) => {
          x.props.isBlurred = false
          x.props.isEditing = false
          return x
        })   

        // @ts-ignore
        updatePostById(post)
        return post
      },
      toggleEmojis: (index) => {
        feedData = feedData.map((x, i) => {
          x.props.showEmojis = index === i ? !x.props.showEmojis : x.props.showEmojis
          return x
        })  
      },
      toggleShowDots: (index) => {
        feedData = feedData.map((x, i) => {
          x.props.showDots = index === i ? !x.props.showDots : x.props.showDots
          return x
        })  
      },      
      toggleShowComments: (index) => {
        feedData = feedData.map((x, i) => {
          x.props.showComments = index === i ? !x.props.showComments : x.props.showComments
          return x
        })  
      },
      toggleEdit: (index) => {        
        feedData = feedData.map((x, i) => {
          x.props.isEditing = index === i ? !x.props.isEditing : x.props.isEditing
          x.props.isBlurred = index !== i ? !x.props.isBlurred : x.props.isBlurred
          return x
        })  
      },
      blurAllBut: (index) => {
        feedData = feedData.map((x, i) => {
          x.props.isBlurred = index !== i ? !x.props.isBlurred : x.props.isBlurred
          return x
        })    
      },
      clear: () => {
        feedData = feedData.map(x => {
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
      },         
    }
  }
  //--------------------------- ONMOUNT

  //---------------------------   

  //--------------------------- EVENT HANDLERS
  const clearPrompt = () => {
    const inEdit = feedData.filter(x => x.isEditing).length > 0
      
    if(inEdit){
      if (confirm("Would you like to discard your changes?")) {
        // @ts-ignore
        events.feed.clear()
      } 
    }
    else{
      // @ts-ignore
      events.feed.clear()
    }

    const openComments = feedData.filter(x => x.showComments).length > 0
    if(openComments){
      // @ts-ignore
      events.feed.clear()
    }


  }
  //---------------------------

</script>

<div class='feed-container'>
  {#each feedData as data, index}
    <div class='feed-container-item' class:blur={data.props.isBlurred} on:click={data.props.isBlurred ? clearPrompt : () => {}} >
      <FeedItem {data} {friendStatus} {index} {events} />
    </div>
  {/each}
</div>  

<style lang='scss'>
  .feed-container{    
    margin-bottom: 20px;
    width: 100%;
    position: relative;    

    &-item{
      width: calc(100% - 10px);    
      margin-bottom: 20px;      
      transition: 0.3s;
      box-shadow: none;
      
      &:hover{        
        box-shadow: 10px 8px 5px rgba(0, 0, 0, 0.25);      
      }

      &.blur{
        opacity: 0.5;
        cursor: pointer;
        filter: blur(10px);
        box-shadow: none!important
      }      
    }

  }      
</style>

