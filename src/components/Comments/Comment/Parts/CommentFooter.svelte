<script lang='ts'>
  //--------------------------- IMPORTS
  import {getContext} from 'svelte';
  import {ThreeSlot, Button, SVG} from '../../../index'
  
  //--------------------------- COMPONENT PROPS
  export let author;
  export let isMine;
  export let events;
  export let props;
  export let options;
  export let comment;
  export let checkPermissions;

  //--------------------------- VARS  
  const {updateEmoji, toggleShowEmojis, toggleReply, toggleShowComments} = events.comment;
  const loggedIn = getContext('loggedIn')

  const {myEmote} = comment.emotes
  const {myCommentId = null} = comment.comments

  const emojis = [
    {name: 'like', inTray: true},
    {name: 'dislike', inTray: true},
    {name: 'angry', inTray: true},
    {name: 'sad', inTray: false},
    {name: 'wink', inTray: false},
  ]


  //--------------------------- FN
  const getCount = (emoji) => {      
    return comment.emotes[emoji] && comment.emotes[emoji].count || 0    
  }  

  //--------------------------- STYLES
  const sharedStyle = 'width: 50px; height: 25px; background: none; display: flex; justify-content: center; align-items: center; font-size: 10px'
  const buttonStyleLeft = `${sharedStyle};`
  const buttonStyleRight = `${sharedStyle};`
  const svgStyle = 'margin-right: 5px'
</script>

<div class='commentfooter'>
  <ThreeSlot >
    <div slot='left' style='display: flex; width: 100%'>
      <div class='commentfooter__emotes-tray'>
        {#each emojis.filter(x => x.inTray) as {name}}
          <Button style={buttonStyleLeft} onClick={() => {loggedIn && updateEmoji(name)}}>
            <SVG icon={name} size={12} fill={loggedIn ? (myEmote === name ? "green" : 'black') : 'grey'} style={svgStyle} /> 
            <strong>{getCount(name)}</strong>
          </Button>  
        {/each}
      </div>
      {#if loggedIn}
        <div class='commentfooter__emotes-outside' class:show={props.showEmojis}>
          {#each emojis.filter(x => !x.inTray) as {name}}
            <Button style={buttonStyleLeft} onClick={() => {loggedIn && updateEmoji(name)}}>
              <SVG icon={name} size={12} fill={loggedIn ? (myEmote === name ? "green" : 'black') : 'grey'} style={svgStyle} /> 
              <strong>{getCount(name)}</strong>
            </Button>  
          {/each}  
          <Button style={buttonStyleLeft} onClick={toggleShowEmojis}>
            <SVG icon={props.showEmojis ? 'arrow-left' : 'plus'} size={12} /> 
          </Button>        
        </div>       
      {/if}       
    </div>

    <div slot='right'>
      <div style='display: flex'>
        {#if loggedIn}
          <Button style={buttonStyleRight} onClick={toggleReply}>
            <SVG icon="post" size={16} style={svgStyle}/>           
          </Button>    
        {/if}     
        <Button style={buttonStyleRight} onClick={comment.comments.total > 0 && toggleShowComments}>
          <SVG icon="comments" size={12} fill={loggedIn ? (!!myCommentId ? 'green' : "black") : 'grey'} style={svgStyle}/> 
          <strong>{comment.comments.total}</strong>
        </Button>             
      </div>
    </div>
  </ThreeSlot>
</div>


<style lang='scss'>
  .commentfooter{
    height: 25px;
    display: flex;    

    &__emotes{
      display: flex;
      width: 100%;

      &-tray{
        display: flex;      
        z-index: 2;  
        background: white;       
      }

      &-outside{
        z-index: 1;         
        display: flex;       
        transition: 0.3s;
        transform: translateX(-66.666666%);
        &.show{
          transform: translateX(0);
        }       
      }
    }

    &__comment{
      display: flex;
    }
  }
</style>