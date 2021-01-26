<script lang='ts'>
  //--------------------------- IMPORTS    
  import ThreeSlot from '../../../ThreeSlot/ThreeSlot.svelte'  
  import Button from '../../../Button/Button.svelte'  
  import SVG from '../../../SVG/SVG.svelte'  
  import UserPortrait from '../../../UserPortrait/UserPortrait.svelte'

  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime"

  dayjs.extend(relativeTime)
  //---------------------------

  //--------------------------- COMPONENT PROPS
  export let author;
  export let post;
  export let isMine;
  export let options;
  export let checkPermissions;
  export let events;
  export let props;
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
    <ThreeSlot>
      <div slot='left'>
        <UserPortrait userId={author._id} />
      </div>

      {#if author.firstName}
        <div class='name'>
          {isMine ? 'Me' : `${author.firstName} ${author.lastName}`}
        </div>
      {/if}
      {#if post.updatedOn}
        <div class='date'>{dayjs(post.updatedOn).fromNow()}</div>
      {/if}
         
      <div slot='right' style='display: flex'>
        {#if !props.isEditing}
          {#each options as {fn, icon, showInTray, ownerRequired, loginRequired}}
            {#if checkPermissions(loginRequired, ownerRequired) && showInTray}
              <Button onClick={fn} style={buttonStyle}>
                <SVG {icon} />              
              </Button>                    
            {/if}
          {/each}   
          <Button onClick={events.feedItem.toggleShowDots} style={buttonStyle}>
            <SVG icon={'dots'}/>
          </Button>                   
        {:else}                 
          <Button onClick={events.feedItem.toggleEdit} style={buttonStyle}>
            <SVG icon={'cross'}/>
          </Button>   
        {/if}
      </div>           
    </ThreeSlot>
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
    
    .name{
      font-weight: bold
    }

    .date{
      color: grey;
    }

  }  
</style>