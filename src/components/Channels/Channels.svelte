<script lang='ts'>
  import {onMount, tick} from 'svelte'  
  import {SiteStore, DeviceStore} from '@store/store'
  import Loader from '@components/Loader/Loader.svelte'
  
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
  export let nopadding = false;
  export let animate = false;
  export let exactfit = false;
  export let props = null;
  export let disableAnimationOnMobile = false;

  let ready = false
  let xpos;
  let currentChannel = current;  
  let ele; 
  let rootEle;
  let topPos = 0;
  let h = 0;
  let topDifference = 0
  let topOffset = 0;

  const {isNativeMobile} = DeviceStore;

  // watches for changes in offsetHeight
	SiteStore.openNotch.subscribe(async(value) => {
    setTimeout(() => {
      topOffset = topDifference - (ele?.getBoundingClientRect().top || 0)      
    })
	});  

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
      duration: (disableAnimationOnMobile && $isNativeMobile) ? 0 : (animate ? duration : 0),
      easing: easing === 'cubicOut' ? cubicOut : cubicOut
    });   

    console.log( disableAnimationOnMobile && $isNativeMobile )

    ready = true
    channelReady && channelReady(currentChannel)    

    await tick() 
    topDifference = ele?.getBoundingClientRect().top
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

  $: innerStyle = `height: calc(100vh - ${topPos}px + ${topOffset}px - ${embedded ? 10 : exactfit || nopadding ? 0 : 20}px);`

  $: {      
    backtotop && resetScrollTop()
    current != currentChannel && goto(current)     
    topPos = ele?.getBoundingClientRect().top || 0
  }  


</script>


<div class:embedded={embedded}>
  <div class='channels'  >
    {#if ready}
      <div class='channels-container' class:animate={animate} class:disableAnimationOnMobile={disableAnimationOnMobile} bind:this={rootEle} style={`${channelsStyle()};${xPostiion()}`}>
        {#each data as {content, render, active, props}}
          <div class='channel' class:active={active} class:inactive={!active} style={channelStyle()}>
            <div class='channel__inner' class:nopadding={nopadding} class:exactfit={exactfit} bind:this={ele} class:embedded={embedded} style={innerStyle} >
              {#if render}
                <svelte:component this={content} {...props}/>
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
      &.animate{
        animation: ChannelFadeOut 500ms;
      }

      &.disableAnimationOnMobile{
        animation: none!important;
      }
    }

    &.active{
      opacity: 1;
      &.animate{
        animation: ChannelFadeIn 500ms;
      }

      &.disableAnimationOnMobile{
        animation: none!important;
      }
    }     
    
    &__inner{   
      width: calc(100% - double(----channels-padding));      
      padding: var(--channels-padding);
      overflow-x: hidden;
      overflow-y: auto;

      &.nopadding{
        padding: 0;
      }

      &.exactfit{
        width: 100%;
        height: 100vh;
        padding: 0;
        overflow: hidden;
      }

      &.embedded{
        width: calc(100% - var(--channels-padding));
        padding: 0 var(--channels-padding) 0 0;
      }
    }
  }


  @keyframes ChannelFadeIn {
    0%{
      opacity: 0
    }
    75%{
      opacity: 0
    }
    100%{
      opacity: 1
    }
  }

  @keyframes ChannelFadeOut {
    0%{
      opacity: 1
    }
    75%{
      opacity: 1
    }
    100%{
      opacity: 0
    }
  }  
</style>

