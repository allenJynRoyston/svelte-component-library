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
  export let isMine;
  export let props;
  export let cardFunctions;

  //---------------------------

  //--------------------------- VARS
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

    {#if !props.showDots && !props.isEditing}
      <div class='cardheader-container__options'>
        <Button onClick={cardFunctions.toggleShowDots}>
          <SVG icon={'dots'}/>
        </Button>
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


    &__portrait, &__options{
      display: flex;
      align-items: center;                  

      img{
        width: auto;
        height: 100%;
        max-width: 60px;
      }
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