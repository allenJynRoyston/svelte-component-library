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
    setTimeout(() => {
      isDark = ele?.className.includes('dark-theme')
    }, 25)
  })  

</script>

<button class={`root-component channel-button`} class:rounded={rounded} on:click={onClick} bind:this={ele}>
  <div class='icon' >
    <SVG icon={leftIcon || 'globe'} fill={!isDark ? '#333' : 'white'} ignoreTheme size={iconSize} />
  </div>
  <div class='content' type='button' on:click={onClick}>
    <slot>
      {content || 'Button'}
    </slot>
  </div>
  <div class='icon' >
    <SVG icon={rightIcon || 'arrow-right'} fill={!isDark ? '#333' : 'white'} ignoreTheme size={iconSize} />
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

    background: var(--white-0);
    color: var(--black-1);
    border: 3px solid var(--black-1);
    &:active{      
      background: var(--white-1);
    }        

    &.dark-theme{
      background: var(--black-1);
      color: var(--white-0);
      border: 3px solid var(--black-2);
      &:active{
        background: var(--black-2);
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
