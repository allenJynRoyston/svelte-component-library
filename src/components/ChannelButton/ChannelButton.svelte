<script lang='ts'>
  import {onMount, tick} from 'svelte';
  import SVG from '../SVG/SVG.svelte'


  export let onClick = () => {}
  export let leftIcon = null;
  export let rightIcon = null;
  export let content = null;
  export let iconSize = 18;
  export let rounded = false;

  let isDark = false;
  let ele;

  onMount(async() => {
    await tick()
    isDark = ele.className.includes('dark-theme')
  })  

</script>

<button class={`root-component channel-button`} class:rounded={rounded} on:click={onClick} bind:this={ele}>
  <div class='icon' >
    <SVG icon={leftIcon || 'globe'} fill={isDark ? 'white' : '#333'} size={iconSize} />
  </div>
  <div class='content' type='button' on:click={onClick}>
    <slot>
      {content || 'Button'}
    </slot>
  </div>
  <div class='icon' >
    <SVG icon={rightIcon || 'arrow-right'} fill={isDark ? 'white' : '#333'} size={iconSize} />
  </div>
</button>


<style lang='scss' scoped>

  .channel-button{
    width: calc(100% - 6px);
    height: auto;
    padding: 5px 0;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    outline: none;

    background: white;   
    color: #333;
    border: 3px solid #333;
    &:active{
      background: #555
    }        

    &.dark-theme{
      background: #333;   
      color: white;
      border: 3px solid #555;
      &:active{
        background: #555
      }      
    }

    &.rounded{
      border-radius: 20px;
    }
  }

  .icon{
    width: 50px;    
  }

  .content{
    width: 100%;    
    text-align: left;
  }
</style>
