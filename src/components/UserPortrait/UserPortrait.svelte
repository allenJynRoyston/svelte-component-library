<script lang='ts'>
  //--------------------------- IMPORTS  
  import { UserFetcher } from '../index'

  //---------------------------

  //--------------------------- COMPONENT PROPS
  export let userId;
  export let rounded = false;
  export let style = null;
  export let currentEmotion = null;
  export let onClick = () => {}

  //---------------------------

  //--------------------------- VARS
  let user = null;
  //---------------------------
  
  //--------------------------- ONMOUNT
  //---------------------------   

  //--------------------------- EVENT HANDLERS
  //---------------------------

  //--------------------------- FUNCTIONS
  const getPortrait = () => {
    return user.portrait.imageSrc || '/images/profile/default.png'
  }

  const getCurrentEmotion = (emotion) => {    
    if(emotion === null){
      return user.portrait.imageSrc || '/images/profile/default.png'
    }
    else{
      let imgSrc = user.emotionImageSrc[emotion] || null
      return !!imgSrc ? imgSrc : `/images/emotions/${emotion}.png`
    }
  }

  const fetchUser = (u) => {
    user = u
  }
  //---------------------------  
</script>

<UserFetcher id={userId} onComplete={fetchUser}/>

{#if user}
  <div class='userportrait'  {style}>
    <img class='portrait' class:rounded={rounded} src={getPortrait()} alt="emotion" on:click={onClick} />
    {#if currentEmotion}
      <img class='emotion' class:rounded={rounded} src={getCurrentEmotion(currentEmotion)} alt="emotion" on:click={onClick} />
    {/if}
  </div>
{/if}

<style lang='scss'>
  .userportrait{
    position: relative;

    .emotion{
      position: absolute;
      top: 20px;
      left: 20px;
      width: 35px;
    }

    img{
      &.rounded{
        border-radius: 50%
      }
    }
  }
</style>