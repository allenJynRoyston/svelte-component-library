<script lang='ts'>
  import SVG from '../SVG/SVG.svelte'

 
  export let onClick = () => {}
  export let leftIcon = null;
  export let rightIcon = null;
  export let content = null;
  export let iconSize = 18;

</script>

<button class='channel-button' on:click={onClick}>
  <div class='icon' >
    <SVG icon={leftIcon || 'globe'} fill={'white'} size={iconSize} />
  </div>
  <div class='content' type='button' on:click={onClick}>
    <slot>
      {content || 'Button'}
    </slot>
  </div>
  <div class='icon' >
    <SVG icon={rightIcon || 'arrow-right'} fill={'white'} size={iconSize} />
  </div>
</button>


<style lang='scss' scoped>

  .channel-button{
    width:100%;
    height: auto;
    padding: 5px 0;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #333;   
    cursor: pointer;

    outline: none;
    border: none;

    &:active{
      background: #444
    }

  }

  .icon{
    width: 50px;    
  }

  .content{
    width: 100%;    
    color: white;
    text-align: left;
  }
</style>
