<script lang='ts'>
  //--------------------------- IMPORTS  
  import {getContext} from 'svelte'  
  import Comment from './Comment/Comment.svelte'
  import CommentFetcher from '../Fetcher/CommentFetcher.svelte'

  //--------------------------- COMPONENT PROPS
  export let commentIds;
  export let events = {}; 
  export let state = {};
  export let level;
  export let fetchMore = () => {}
  //---------------------------

  //--------------------------- APP CONTEXT   
  const updateCommentById = getContext('updateCommentById') 
  const createComment = getContext('createComment') 
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
      createNewComment: async({comment, index}) => {
        commentData = commentData.map((x, i) => {          
          x.props.isCreating = index === i ? true : x.props.isCreating
          return x
        })  

        // @ts-ignore
        await createComment(comment)

        commentData = commentData.map((x, i) => {          
          x.props.isCreating = index === i ? false : x.props.isCreating
          x.props.showReply = false
          return x
        })  
      },
      toggleShowEmotions: (index) => {
        commentData = commentData.map((x, i) => {          
          x.props.showEmotions = index === i ? !x.props.showEmotions : x.props.showEmotions
          return x
        })  
      },
      toggleReply: (index) => {
        commentData = commentData.map((x, i) => {          
          x.props.showReply = index === i ? !x.props.showReply : x.props.showReply
          return x
        }) 
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
            showEmotions: false,
            showReply: false,

            isCreating: false,
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
      showEmotions: false,
      showReply: false,

      isCreating: false,
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
    <Comment {comment} {events} {index} {level} last={index + 1 === commentData.length}/>
  </div>
{/each}

<style lang='scss'>
  .comment-section{
    width: 100%;    
  }
</style>