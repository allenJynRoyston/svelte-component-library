<script lang='ts'>
  //--------------------------- IMPORTS  
  import { SVG, Button } from '../../index'
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime"

  dayjs.extend(relativeTime)
  //---------------------------

  //--------------------------- COMPONENT PROPS
  export let author;
  export let post;
  export let options;
  export let isMine;
  export let props;
  export let checkPermissions;
  export let cardFunctions;

  //---------------------------

  //--------------------------- VARS
  const buttonStyle = 'width: 25px; height: 25px; border-radius: 50%; margin: 0 5px;'
  //---------------------------
  
  //--------------------------- ONMOUNT
  //---------------------------   

  //--------------------------- EVENT HANDLERS
  //---------------------------

  //--------------------------- FUNCTIONS
  //---------------------------  
</script>

{#if author && post}
  <div class='cardheader-container'>
    <div class='cardheader-container__portrait'>   
      {#if author.portrait}   
        <img src={author.portrait.imageSrc} alt={author.portrait.imageSrc} />
      {:else}
        <img src="https://via.placeholder.com/150/b2fe8" alt="https://via.placeholder.com/150/b2fe8" />
      {/if}
    </div>
    <div class='cardheader-container__bio'>
      {#if author.firstName}
        <div class='name'>
          {isMine ? 'Me' : `${author.firstName} ${author.lastName}`}
        </div>
      {/if}
      {#if post.updatedOn}
        <div class='date'>{dayjs(post.updatedOn).fromNow()}</div>
      {/if}
    </div>

    {#if !props.showDots}
      <div class='cardheader-container__options'>
        {#if !props.isEditing}
          {#each options as {fn, icon, showInTray, ownerRequired, loginRequired}}
            {#if checkPermissions(loginRequired, ownerRequired) && showInTray}
              <Button onClick={fn} style={buttonStyle}>
                <SVG {icon} />              
              </Button>                    
            {/if}
          {/each}   
          <Button onClick={cardFunctions.toggleShowDots} style={buttonStyle}>
            <SVG icon={'dots'}/>
          </Button>        
        {:else}    
          <Button onClick={cardFunctions.toggleEdit} style={buttonStyle}>
            <SVG icon={'arrow-left'}/>
          </Button>   
        {/if}
      </div>
    {/if}
    
  </div>  
{:else}
  <div class='cardheader-container'>
    <span>Loading...</span>  
  </div>  
{/if}

<style lang='scss'>
  .cardheader-container{
    display: flex;    
    border-bottom: 1px solid black;
    position: relative;
    height: 45px;
    

    &__portrait{
      display: flex;
      align-items: center;                        
      border-right: 1px solid black;
      overflow: hidden;
      width: 60px;
      margin-right: 10px;
      background: black;

      img{
        width: 100%;
        height: auto;
      }
    }

    &__options {
      display: flex;
      align-items: center;                        
    }

    &__bio{
      width: 100%;
      padding: 5px 0;

      .name{
        font-size: 14px;
        font-weight: bold;
      }

      .date{
        font-size: 14px;
      }
    }

  }  
</style>