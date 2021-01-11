<script lang='ts'>
  //--------------------------- IMPORTS  
  import {getContext, tick} from 'svelte'
  import {Comment, CommentFetcher} from '../index'

  //--------------------------- COMPONENT PROPS
  export let commentIds;
  export let events = {}; 
  export let state = {};
  export let level;
  export let fetchMore = () => {}
  //---------------------------

  //--------------------------- APP CONTEXT   
  const updateCommentById = getContext('updateCommentById')  
  //---------------------------    

  //--------------------------- VARS   
  let commentData = []

  events = {
    ...events,  
    comments: {
      share: (post) => {     
        alert('share')
      }, 
      report: () => {     
        alert("report")
      },        
      update: async({comment}) => {
        commentData = commentData.map((x, i) => {
          x.props.isBlurred = false
          x.props.isEditing = false
          return x
        })   

        // @ts-ignore
        updateCommentById(comment)
        return comment
      },
      toggleEmojis: (index) => {
        commentData = commentData.map((x, i) => {          
          x.props.showEmojis = index === i ? !x.props.showEmojis : x.props.showEmojis
          return x
        })  
      },
      toggleShowDots: (index) => {
        commentData = commentData.map((x, i) => {
          x.props.showDots = index === i ? !x.props.showDots : x.props.showDots
          return x
        })          
      },      
      toggleShowComments: (index) => {
        commentData = commentData.map((x, i) => {
          x.props.showComments = index === i ? !x.props.showComments : x.props.showComments
          return x
        })          
      },
      toggleEdit: (index) => {       
        commentData = commentData.map((x, i) => {
          x.props.isEditing = index === i ? !x.props.isEditing : x.props.isEditing
          x.props.isBlurred = index !== i ? !x.props.isBlurred : x.props.isBlurred
          return x
        })  
      },
      blurAllBut: (index) => {
        commentData = commentData.map((x, i) => {
          x.props.isBlurred = index !== i ? !x.props.isBlurred : x.props.isBlurred
          return x
        })    
      },
      clear: () => {
        commentData = commentData.map(x => {
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
  const fetchComment = async(data) => {
    data.props = {
      showComments: false,
      showEmojis: false,
      showDots: false,

      isSaving: false,
      isBlurred: false,
      isEditing: false          
    }

    commentData = [...commentData, data]
  }
  //---------------------------   

</script>


{#each commentIds as id}
  <CommentFetcher {id} onComplete={fetchComment} />
{/each}


{#each commentData as comment, index}
  <div class='comment-section'>       
    <Comment {comment} {events} {index} {level} />
  </div>
{/each}



<style lang='scss'>
  .comment-section{
    width: 100%;    
  }
</style>