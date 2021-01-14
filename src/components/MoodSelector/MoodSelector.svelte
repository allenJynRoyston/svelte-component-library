<script lang='ts'>
  //--------------------------- IMPORTS  
  import {UserFetcher, Button} from '../index'


  //--------------------------- COMPONENT PROPS
  export let userId;
  export let onClick = null;
  //---------------------------

  //--------------------------- VARS   
  let render = false
  let moods = []
  let user;
  
  //---------------------------

  //--------------------------- FN
  const fetchUser = (u) => {       
    user = u 
    moods = []
    
    for (const [key, value] of Object.entries(user.emotionImageSrc)) {      
      moods.push({key, value: !!value ? value : `/images/emotions/${key}.png`})
    }
    render = true
  }
  //---------------------------   


  //--------------------------- $  
  //---------------------------
</script>

<UserFetcher id={userId} onComplete={fetchUser} />

{#if render}
  {#each moods as {key:alt, value:src}}
    <Button onClick={() => {onClick && onClick(alt)}} style={'background: none; margin: 0; margin-right: 10px; padding: 0'} >
      <img {src} {alt} /> 
    </Button>
  {/each}
{/if}


<style lang='scss'>
  img{
    width: 30px;
    height: auto;
    border-radius: 50%;
  }

</style>