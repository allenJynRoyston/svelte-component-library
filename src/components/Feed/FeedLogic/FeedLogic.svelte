<script lang='ts'>
  //--------------------------- IMPORTS  
  import {getContext} from 'svelte'
  import {Card} from '../../index'


  //--------------------------- COMPONENT PROPS
  export let data = []  
  export let friendStatus;
  //---------------------------

  //--------------------------- APP CONTEXT 
  const findPostById = getContext('findPostById')
  const updatePostById = getContext('updatePostById')  
  //---------------------------    

  //--------------------------- VARS
  let feedData = data.map(x => {
    x.isBlurred = false
    x.isEditing = false
    return x
  })

  const feedFunctions = {
    update: async({post}) => {
      // @ts-ignore
      updatePostById(post)
      feedFunctions.clear()
      return post
    },
    editItem: (index) => {
      feedData = data.map((x, i) => {
        x.isEditing = index === i ? !x.isEditing : x.isEditing
        return x
      })   
    },
    clear: () => {
      feedData = data.map(x => {
        x.isEditing = false
        x.isBlurred = false
        return x
      })    
    },   
    blurAllBut: (index) => {
      feedData = data.map((x, i) => {
        x.isBlurred = index !== i ? !x.isBlurred : x.isBlurred
        return x
      })    
    }
  }
  //--------------------------- ONMOUNT

  //---------------------------   

  //--------------------------- EVENT HANDLERS
  const clearPrompt = () => {
    const inEdit = data.filter(x => x.isEditing).length > 0
      
    if(inEdit){
      if (confirm("Would you like to discard your changes?")) {
        feedFunctions.clear()
      } 
    }
    else{
      feedFunctions.clear()
    }
  }
  //---------------------------

</script>

<div class='feed-container'>
  {#each feedData as data, index}
    <div class='feed-container-item' class:blur={data.isBlurred} on:click={data.isBlurred ? clearPrompt : () => {}} >
      <Card {data} {friendStatus} {index} {feedFunctions} />
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

