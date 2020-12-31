<script lang='ts'>
  //--------------------------- IMPORTS
  import {Button, SVG} from '../../index'
  //--------------------------- COMPONENT PROPS
  export let post;
  export let author;
  export let isMine;
  export let cardFunctions;
  export let props;

  //--------------------------- VARS  
  const {updateEmoji, toggleShowEmojis, toggleShowComments} = cardFunctions;
  const {myEmote, likes, dislikes} = post.emotes

  const emojis = [
    {name: 'like', inTray: true},
    {name: 'dislike', inTray: true},
    {name: 'angry', inTray: true},
    {name: 'sad', inTray: false},
    {name: 'wink', inTray: false},
  ]

  //--------------------------- FN
  const getCount = (emoji) => {      
    return post.emotes[emoji] && post.emotes[emoji].count || 0    
  }

  //--------------------------- STYLES
  const sharedStyle = 'width: 50px; height: 25px; background: none; display: flex; justify-content: center; align-items: center; font-size: 10px'
  const buttonStyleLeft = `${sharedStyle}; border-right: 1px solid black`
  const buttonStyleRight = `${sharedStyle}; border-left: 1px solid black`
  const svgStyle = 'margin-right: 5px'
</script>

<div class='cardfooter'>
  <div class='cardfooter__emotes'>

    <div class='cardfooter__emotes-tray'>
      {#each emojis.filter(x => x.inTray) as {name}}
        <Button style={buttonStyleLeft} onClick={() => {updateEmoji(name)}}>
          <SVG icon={name} size={12} fill={myEmote === name ? "green" : 'black'} style={svgStyle} /> 
          <strong>{getCount(name)}</strong>
        </Button>  
      {/each}
    </div>
    <div class='cardfooter__emotes-outside' class:show={props.showExtraEmojis}>
      {#each emojis.filter(x => !x.inTray) as {name}}
        <Button style={buttonStyleLeft} onClick={() => {updateEmoji(name)}}>
          <SVG icon={name} size={12} fill={myEmote === name ? "green" : 'black'} style={svgStyle} /> 
          <strong>{getCount(name)}</strong>
        </Button>  
      {/each}  
      <Button style={buttonStyleLeft} onClick={toggleShowEmojis}>
        <SVG icon={props.showExtraEmojis ? 'arrow-left' : 'plus'} size={12} /> 
      </Button>        
    </div>  
  </div>

  <div class='cardfooter__comment'>
    <Button style={buttonStyleRight} onClick={toggleShowComments}>
      <SVG icon="comments" size={12} fill={"black"} style={svgStyle}/> 
      <strong>110</strong>
    </Button>     
  </div>
</div>

<style lang='scss'>
  .cardfooter{
    height: 25px;
    border-top: 1px solid black;    
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