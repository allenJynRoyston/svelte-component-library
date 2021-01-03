<script lang='ts'>
  //--------------------------- IMPORTS
  import {Button, SVG} from '../../index'
  //--------------------------- COMPONENT PROPS
  export let data;
  //--------------------------- VARS  
  const {myEmote} = data.emotes
  const {myCommentId = null} = data.comments

  const emojis = [
    {name: 'like', inTray: true},
    {name: 'dislike', inTray: true},
    {name: 'angry', inTray: true},
    {name: 'sad', inTray: false},
    {name: 'wink', inTray: false},
  ]

  //--------------------------- FN
  const getCount = (emoji) => {      
    return data.emotes[emoji] && data.emotes[emoji].count || 0    
  }

  //--------------------------- STYLES
  const sharedStyle = 'width: 50px; height: 25px; background: none; display: flex; justify-content: center; align-items: center; font-size: 10px'
  const buttonStyleLeft = `${sharedStyle}; border-right: 1px solid black`
  const buttonStyleRight = `${sharedStyle}; border-left: 1px solid black`
  const svgStyle = 'margin-right: 5px'
</script>

<div class='commentfooter'>
  <div class='commentfooter__emotes'>

    <div class='commentfooter__emotes-tray'>
      {#each emojis.filter(x => x.inTray) as {name}}
        <Button style={buttonStyleLeft} onClick={() => {}}>
          <SVG icon={name} size={12} fill={myEmote === name ? "green" : 'black'} style={svgStyle} /> 
          <strong>{getCount(name)}</strong>
        </Button>  
      {/each}
    </div>
    <div class='commentfooter__emotes-outside' class:show={false}>
      {#each emojis.filter(x => !x.inTray) as {name}}
        <Button style={buttonStyleLeft} onClick={() => {}}>
          <SVG icon={name} size={12} fill={myEmote === name ? "green" : 'black'} style={svgStyle} /> 
          <strong>{getCount(name)}</strong>
        </Button>  
      {/each}  
      <Button style={buttonStyleLeft} onClick={() => {}}>
        <SVG icon={false ? 'arrow-left' : 'plus'} size={12} />
      </Button>        
    </div>  
  </div>

  <div class='commentfooter__comment'>
    <Button style={buttonStyleRight} onClick={() => {}}>
      <SVG icon="comments" size={12} fill={!!myCommentId ? 'green' : "black"} style={svgStyle}/> 
      <strong>{data.comments.count}</strong>
    </Button>     
  </div>
</div>

<style lang='scss'>
  .commentfooter{
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