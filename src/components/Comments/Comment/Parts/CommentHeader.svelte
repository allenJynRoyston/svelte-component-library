<script lang='ts'>
  //--------------------------- IMPORTS  
  import {ThreeSlot, Button, SVG} from '../../../index'
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime"

  dayjs.extend(relativeTime)

  //--------------------------- COMPONENT PROPS
  export let author;
  export let isMine;
  export let events;
  export let props;
  export let options;
  export let comment;
  export let checkPermissions;


  //---------------------------

  //--------------------------- VARS   
  const buttonStyle = 'width: 25px; height: 25px; border-radius: 50%; margin: 0 5px;'
  const {toggleShowDots, toggleEdit} = events.comment
  //---------------------------

  
  //--------------------------- ONMOUNT
  //---------------------------   


  //--------------------------- $  
  //---------------------------
</script>


<div class='comment-header'>
  <ThreeSlot>
    <div slot='left'>
      {#if author.portrait}   
        <img src={author.portrait.imageSrc} alt={author.portrait.imageSrc} style='border-radius: 50%' />
      {:else}
        <img src="https://via.placeholder.com/150/b2fe8" alt="https://via.placeholder.com/150/b2fe8" />
      {/if}
    </div>

  
    {#if author.firstName}
      <div class='name'>
        {isMine ? 'Me' : `${author.firstName} ${author.lastName}`}
      </div>
    {/if}
    {#if comment.updatedOn}
      <div class='date'>{dayjs(comment.updatedOn).fromNow()}</div>
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
        <Button onClick={toggleShowDots} style={buttonStyle}>
          <SVG icon={'dots'}/>
        </Button>                   
      {:else}    
        <Button onClick={toggleShowDots} style={buttonStyle}>
          <SVG icon={'save'}/>
        </Button>               
        <Button onClick={toggleEdit} style={buttonStyle}>
          <SVG icon={'cross'}/>
        </Button>   
      {/if}
    </div>
  </ThreeSlot>
</div>


<style lang='scss'>
  .comment-header{
    width: 100%;
  }
</style>