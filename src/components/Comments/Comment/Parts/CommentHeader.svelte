<script lang='ts'>
  //--------------------------- IMPORTS    
  import ThreeSlot from '../../../ThreeSlot/ThreeSlot.svelte'
  import Button from '../../../Button/Button.svelte'
  import SVG from '../../../SVG/SVG.svelte'
  import MoodSelector from '../../../MoodSelector/MoodSelector.svelte'
  import UserPortrait from '../../../UserPortrait/UserPortrait.svelte'

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
  const {toggleShowDots, toggleEdit, toggleShowEmotions, updateEmote} = events.comment  
  //---------------------------

  //--------------------------- FN
  const changeEmote = (emote) => {
    updateEmote && updateEmote(emote)
    toggleShowEmotions && toggleShowEmotions()
  }

  const toggleEmotions = () => {
    toggleShowEmotions && toggleShowEmotions()
  }
  //---------------------------   


  //--------------------------- $  
  //---------------------------
</script>


<div class='comment-header'>
  <ThreeSlot>
    <div slot='left'>
      <UserPortrait userId={author._id} rounded={true} onClick={() => {isMine && toggleEmotions()}}  />
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
        <Button onClick={toggleEdit} style={buttonStyle}>
          <SVG icon={'cross'}/>
        </Button>   
      {/if}
    </div>
  </ThreeSlot>

  {#if isMine}
    <div class='comment-header__emotes' class:show={props.showEmotions} >
      <MoodSelector userId={author._id} onClick={changeEmote} />
    </div>
  {/if}
</div>


<style lang='scss'>
  .comment-header{
    position: relative;
    width: 100%;

    img{
      width: 35px;
      height: auto;
      border-radius: 50%;
      cursor: pointer;
    }

    .emotion{
      position: absolute;
      top: 20px;
      left: 20px;
      width: 20px;
    }

    &__emotes{
      position: relative;
      top: 0;
      left: 0;      
      height: 0;
      overflow: hidden;
      &.show{
        height: auto;
        margin-top: 20px;
      }
    }
  }
</style>