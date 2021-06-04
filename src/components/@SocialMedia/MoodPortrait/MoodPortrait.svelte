<script lang='ts'>
  //--------------------------- IMPORTS  
  import UserFetcher from '../Fetcher/UserFetcher.svelte'

  //--------------------------- COMPONENT PROPS
  export let userId;
  export let currentEmotion;
  export let onClick = null;
  export let rounded = true;
  //---------------------------

  //--------------------------- VARS   
  let render = false
  let moods = {}
  let user;
  
  //---------------------------

  //--------------------------- FN
  const fetchUser = (u) => {       
    user = u 
    for (const [key, value] of Object.entries(user.emotionImageSrc)) {    
      moods[key] = {src: !!value ? value : `/images/emotions/${key}.png`}   
    }
    render = true
  }
  //---------------------------   


  //--------------------------- $  
  //---------------------------
</script>

<UserFetcher id={userId} onComplete={fetchUser} />

{#if render && currentEmotion}
  <img class:rounded={rounded} src={moods[currentEmotion].src} alt={'portrait'} on:click={() => {onClick && onClick()}} />
{/if}


<style lang='scss'>
  img{
    width: 30px;
    height: 30px;    
    margin-right: 10px;

    &.rounded{
      border-radius: 50%;
    }
  }

</style>