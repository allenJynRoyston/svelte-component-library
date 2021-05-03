<script lang='ts'>
  import {onMount, tick} from 'svelte'  
  import HashWatch from '../URLWatcher/HashWatch.svelte'
  import Loader from '../Loader/Loader.svelte'
  
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

  export let data = []
  export let current;
  export let afterUpdate = null;
  export let channelReady = null;
  export let hideoverflow = false;
  export let nopadding = false;

  export let duration = 400;
  export let easing = 'cubicOut'

  export let buttons = false;
  export let animate = false;
  

  let ready = false
  let xpos;
  let currentChannel = current;
  let busy = false
  let ele; 

  const createSizeTables = () => {
    const table = []
    const chunk = Number((100 / data.length).toFixed(4))
    data.forEach((x, i) => {
      table.push(-(i * chunk))
    })
    return table
  }

  onMount(async() => {
    const table = createSizeTables()
    // set xxpos to be tweened
    xpos = tweened(table[currentChannel], {
      duration,
      easing: easing === 'cubicOut' ? cubicOut : cubicOut
    });   

    ready = true
    channelReady && channelReady(currentChannel)    
  })

  const goto = async (channel) => {
    if(!busy){
      busy = true;
      currentChannel = channel      
      draw()       
    }
  }

  const draw = async() => {
    const table = createSizeTables()
    const val = table[currentChannel]    
    channelReady && channelReady(currentChannel)  

    await xpos.set(val)
    afterUpdate && afterUpdate()    
    busy = false
  }
  
  $: xPostiion = () => {    
    return `transform: translateX(${$xpos}%); `
  }

  $: channelsStyle = () => {
    return `width: ${data.length * 100}%;`
  }

  $: channelStyle = () => {
    return `width: calc(${((1 / data.length)*100).toFixed(4)}%)`
  }  

  $: {
     if(current != currentChannel){
       goto(current)
     }     
  }  

  
  
</script>


<div class='channels' class:animate={animate} bind:this={ele}>
  {#if ready}
    <div class='channels-container' style={`${channelsStyle()};${xPostiion()}`}>
      {#each data as {content, render, active}}
        <div class='channel' class:active={active} class:inactive={!active} style={channelStyle()}>
          <div class='channel__inner' class:hideoverflow={hideoverflow} class:nopadding={nopadding}>
            {#if render}
              <svelte:component this={content}  />
            {:else}
              <Loader show />    
            {/if}
          </div>     
        </div>
      {/each}
    </div> 
  {:else}
    <p>Loading...</p>
  {/if}
</div>


<style lang='scss' scoped>
  .channels{
    overflow: hidden;
  }

  .channels-container{
    position: relative;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    will-change: transform;
  }

  .channel{
    width: 100%;   
    
    &.inactive{
      opacity: 0;
    }

    &.active{
      opacity: 1
    }     
    
    &__inner{    
      width: calc(100% - 20px);
      height: calc(100vh - 20px);
      padding: 10px;      
      overflow-x: hidden;
      overflow-y: auto;
      
      &.nopadding{
        width: 100%;
        height: 100%;
        padding: 0;
      }
      
      &.hideoverflow{        
        overflow: hidden;
      }

    }
  }
</style>

