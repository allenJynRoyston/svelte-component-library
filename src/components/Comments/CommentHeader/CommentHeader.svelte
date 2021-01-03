<script lang='ts'>
  //--------------------------- IMPORTS  

  //--------------------------- COMPONENT PROPS
  export let user;
  //---------------------------

  //--------------------------- VARS   


  
  //--------------------------- ONMOUNT

  //---------------------------   


  //--------------------------- $
  //---------------------------
</script>

<!-- <ImageFetcher id={} -->

<div class='comment-header'>
  <img src={user.portrait.imageSrc} alt={user.portrait.imageSrc} />
  <p>{user.firstName} {user.lastName}</p>
</div>


<style lang='scss'>
  .comment-header{
    display: flex;
    align-items: center;

    img{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }

  }
</style>