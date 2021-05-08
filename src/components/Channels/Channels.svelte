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
  export let duration = 400;
  export let easing = 'cubicOut'
  export let embedded = false;
  export let backtotop = false;
  export let animate = false;
  

  let ready = false
  let xpos;
  let currentChannel = current;  
  let ele; 
  let rootEle;

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
    currentChannel = channel      
    draw()       
  }

  const draw = async() => {
    const table = createSizeTables()
    const val = table[currentChannel]    
    channelReady && channelReady(currentChannel)  

    await xpos.set(val)
    afterUpdate && afterUpdate()        
  }

  const resetScrollTop = () => {
    if(rootEle){
      const eleNodes = rootEle.getElementsByClassName('channel__inner')
      for(ele of eleNodes){
        ele.scrollTop = 0
      }
    }
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

  $: innerStyle = () => {
    if(ele){
      const top = ele.getBoundingClientRect().top
      return `height: calc(100vh - ${top}px - ${embedded ? 10 : 20}px);`
    }
  }  

  $: {      
    backtotop && resetScrollTop()
    current != currentChannel && goto(current)     
  }  

  
  
</script>

<div class:embedded={embedded}>
  <div class='channels' class:animate={animate} >
    {#if ready}
      <div class='channels-container' bind:this={rootEle} style={`${channelsStyle()};${xPostiion()}`}>
        {#each data as {content, render, active}}
          <div class='channel' class:active={active} class:inactive={!active} style={channelStyle()}>
            <div class='channel__inner' bind:this={ele} class:embedded={embedded} style={innerStyle()} >
              {#if render}
                <svelte:component this={content} />
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
</div>

<style lang='scss' scoped>
  @function double($val){
    @return $val * 2
  }

  :root{
    --channels-padding: 10px;
  }

  .embedded{
    overflow: hidden;
  }

  .channels{
    overflow: hidden;
  }

  .channels-container{
    display: flex;
    flex-direction: row;
    overflow: hidden;
    will-change: transform;
  }

  .channel{
    position: relative;
    width: 100%;   
    
    &.inactive{
      opacity: 0;
    }

    &.active{
      opacity: 1
    }     
    
    &__inner{   
      width: calc(100% - double(----channels-padding));      
      padding: var(--channels-padding);
      overflow-x: hidden;
      overflow-y: auto;

      &.embedded{
        width: calc(100% - var(--channels-padding));
        padding: 0 var(--channels-padding) 0 0;
      }
    }
  }
</style>

