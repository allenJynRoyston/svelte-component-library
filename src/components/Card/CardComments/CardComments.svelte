<script lang='ts'>
  //--------------------------- IMPORTS  
  import {Form, SVG} from '../../index'

  //--------------------------- COMPONENT PROPS
  export let post;
  export let author;
  export let isMine;
  export let cardFunctions;
  export let props;

  //---------------------------

  //--------------------------- VARS
  let formData = [
    {
      renderAs: 'textarea', 
      key: props.postId,      
      value: post.content,
      required: true,
      contentEdit: true,
    }    
  ]

  const formProps = {
    formData,
    onSubmit: cardFunctions.onSubmit,
    padding: 20,
    localStorageKey: 'postid',
    clearLocalStorage: true
  }      
  //--------------------------- ONMOUNT

  //---------------------------   

  //--------------------------- EVENT HANDLERS

  //---------------------------

  //--------------------------- $
  //---------------------------
  
</script>

<div class='cardcomments'>  
  <p>Comments</p>
</div>

<style lang='scss'>
  .cardcomments{
    width: calc(100% - 20px);
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px
  }
</style>