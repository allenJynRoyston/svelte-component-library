<script lang='ts'>
  //--------------------------- IMPORTS
  import {ThreeSlot, Button, SVG} from '../../../index'
  
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
  const {updateEmoji, toggleShowEmojis, toggleShowComments} = events.feedItem;

  const {myEmote} = post.emotes
  const {myCommentId = null} = post.comments

  const emojis = [
    {name: 'plus', inTray: true},
    {name: 'minus', inTray: true},
    {name: 'like', inTray: true},
    {name: 'dislike', inTray: false},
    {name: 'angry', inTray: false},
    {name: 'sad', inTray: false},
    {name: 'wink', inTray: false},
  ]

  //--------------------------- FN
  const getCount = (emoji) => {      
    return post.emotes[emoji] && post.emotes[emoji].count || 0    
  }

  //--------------------------- STYLES
  const sharedStyle = 'width: 50px; height: 25px; background: none; display: flex; justify-content: center; align-items: center; font-size: 10px'
  const buttonStyleLeft = `${sharedStyle}`
  const buttonStyleRight = `${sharedStyle}`
  const svgStyle = 'margin-right: 5px'
</script>


<div class='cardfooter'>
  <ThreeSlot >
    <div slot='left' style='display: flex; width: 100%'>
      <div class='cardfooter__emotes-tray'>
        {#each emojis.filter(x => x.inTray) as {name}}
          <Button style={buttonStyleLeft} onClick={() => {updateEmoji(name)}}>
            <SVG icon={name} size={12} fill={myEmote === name ? "green" : 'black'} style={svgStyle} /> 
            <strong>{getCount(name)}</strong>
          </Button>  
        {/each}
      </div>
      <div class='cardfooter__emotes-outside' class:show={props.showEmojis}>
        {#each emojis.filter(x => !x.inTray) as {name}}
          <Button style={buttonStyleLeft} onClick={() => {updateEmoji(name)}}>
            <SVG icon={name} size={12} fill={myEmote === name ? "green" : 'black'} style={svgStyle} /> 
            <strong>{getCount(name)}</strong>
          </Button>  
        {/each}  
        <Button style={buttonStyleLeft} onClick={toggleShowEmojis}>
          <SVG icon={props.showEmojis ? 'arrow-left' : 'plus'} size={12} /> 
        </Button>        
      </div>              
    </div>

    <div slot='right'>
      <Button style={buttonStyleRight} onClick={post.comments.total > 0 && toggleShowComments}>
        <SVG icon="comments" size={12} fill={!!myCommentId ? 'green' : "black"} style={svgStyle}/> 
        <strong>{post.comments.total}</strong>
      </Button>             
    </div>
  </ThreeSlot>
</div>

<style lang='scss'>
  .cardfooter{    
    display: flex;    
    padding-bottom: 10px;

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
        transform: translateX(calc(-100% + 50px));
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