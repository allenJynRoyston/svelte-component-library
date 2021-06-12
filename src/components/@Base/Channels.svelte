<script lang='ts'>
  import {onMount, onDestroy, tick} from 'svelte'  
  import {SiteStore, DeviceStore} from '@store/store'
  import {debounce} from '@js/utility'

  import Loader from '@base/Loader.svelte'
  
	import { tweened } from 'svelte/motion';
	import * as easings from 'svelte/easing';

  export let data = []
  export let current;
  export let duration = 400;
  export let easing = 'cubicOut'
  export let embedded = false;
  export let backtotop = false;
  export let nopadding = false;
  export let animate = false;
  export let selfContained = false;
  export let outline = false;  
  export let disableAnimationOnMobile = false;
  export let showChannelNumber = false;
  export let showInactive = false;
  export let lazyLoad = false;
  export let dragEnabled = false;
  export let touchEnabled = false;
  export let touchThreshold = 0.2;
  
  export let startChannelTransistion = null;
  export let endChannelTransisition = null;

  export let afterUpdate = null;
  export let channelReady = null;
  export let onChannelClick = null;    
  export let onRightThreshold = null;
  export let onLeftThreshold = null;
  export let onMoveStart = null;
  export let onMoveEnd = null;
  export let onRedraw = null;

  let ready = false
  let xpos;
  let currentChannel = current;  
  let ele; 
  let rootEle;
  let topPos = 0;
  let h = 0;
  let topDifference = 0
  let topOffset = 0;
  
  let animating = false;
  let tracking = false;
  let startX = 0;
  let xCord = 0;
  let touchWidth = 0;
  let xTween = tweened(0, {
		duration: 100,
		easing: easings['linear']
	});

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

  const init = async() => {    
    ready = false;
    const table = createSizeTables()

    // set xxpos to be tweened
    xpos = tweened(table[currentChannel], {
      duration: (disableAnimationOnMobile && $isNativeMobile) ? 0 : (animate ? duration : 0),
      easing: easings[easing] || 'linear'
    });   

    ready = true
    channelReady && channelReady(currentChannel)    

    await tick() 
    topDifference = ele?.getBoundingClientRect().top      
  }
  

  const goto = async(channel) => {    
    startChannelTransistion && startChannelTransistion()
    currentChannel = channel      
    draw()       
  }

  const draw = async() => {
    onRedraw && onRedraw(true)    
    const table = createSizeTables()
    const val = table[currentChannel]    
    channelReady && channelReady(currentChannel)  

    await xpos.set(val)
    afterUpdate && afterUpdate()     
    endChannelTransisition && endChannelTransisition()      
    onRedraw && onRedraw(false)      }

  const resetScrollTop = () => {
    if(rootEle){
      const eleNodes = rootEle.getElementsByClassName('channel__inner')
      for(ele of eleNodes){
        ele.scrollTop = 0
      }
    }
  }

  const resizeEvent = debounce(() => {
    topPos = ele?.getBoundingClientRect().top || 0
  }, 400)  


  onMount(() => {
    init()
    setTimeout(() => {
      resizeEvent()
    })
    window.addEventListener('resize', resizeEvent);
  })

  onDestroy(() => {
    window.removeEventListener('resize', resizeEvent)
  })  

  const onMouseDown = (e) => {
    e.preventDefault();
    tracking = true;
    startX = e.clientX
    onMoveStart && onMoveStart()
  }
  
  const onMouseUp = async(e) => {
    e.preventDefault();        
    onRelease();
  };

  const onMouseMove = (e) => {
    e.preventDefault();     
    if (tracking) {
      xCord = e.clientX - startX
    }
  };  

  const calculateReleaseTween = (dir) => {
    animating = true;
    return new Promise(async(resolve) => {
      if(dir === 1){
        await xTween.set(touchWidth - xCord)        
      }
      if(dir === -1){
        await xTween.set(-touchWidth  - xCord)
      }
      if(dir === 0){
        await xTween.set(-xCord)
      }
      animating = false;      
      resolve(true)
    })    
  }

  const onRelease = async() => {
    const dir = closeThresholdDir();    
    if(dir === 'left'){
      await calculateReleaseTween(1)
      onLeftThreshold && onLeftThreshold()      
    }
    if(dir === 'right'){
      await calculateReleaseTween(-1)
      onRightThreshold && onRightThreshold()      
    }
    if(dir === null){
      await calculateReleaseTween(0)
    }

    // reset variables    
    await tick();    
    tracking = false;
    xCord = 0;
    startX = 0;  
    onMoveEnd && onMoveEnd()    
    xTween.set(0)    
  };  

  const onTouchStart = (e) => {
    e.preventDefault();
    tracking = true;
    startX = e.touches[0].clientX
    onMoveStart && onMoveStart()
  };

  const onTouchMove = (e) => {
    e.preventDefault();     
    if (tracking) {
      xCord =  e.touches[0].clientX - startX
    }
  };

  const onTouchEnd = () => {
    onRelease();
  };  

  $: closeThreshold = xCord/touchWidth

  $: closeThresholdDir = () => {
    if(closeThreshold > touchThreshold  && currentChannel > 0){
      return 'left'
    }
    else if(closeThreshold < -touchThreshold  && currentChannel < data.length - 1){
      return 'right'
    }
    else {
      return null;
    }
  }

  $: xPostiion = () => {    
    return `transform: translateX( calc(${$xpos}% + ${xCord}px + ${tracking ? $xTween : 0}px) ); `
  }

  $: channelsStyle = () => {
    return `width: ${data.length * 100}%;`
  }

  $: channelStyle = () => {
    return `width: calc(${((1 / data.length)*100).toFixed(4)}%)`
  }  

  $: innerStyle = embedded ? `height: calc(100%)` : `height: calc(100vh - ${topPos}px + ${topOffset}px - ${selfContained || nopadding ? 0 : 20}px);`

  $: {      
    backtotop && resetScrollTop()
    current != currentChannel && goto(current)  
    setTimeout(() =>{  
      topPos = ele?.getBoundingClientRect().top || 0      
    }) 
  }  

  $: {
    !!easing && init();
    !!duration && init();
    (animate || !animate) && init();
    (disableAnimationOnMobile || !disableAnimationOnMobile) && init()
  }



</script>



<div class='channels' class:embedded={embedded} >
  {#if showChannelNumber}
    <div class='channel-number'>
      <span>{current + 1}/{data.length}</span>
    </div> 
  {/if}

  {#if ready}
    <div class='channels-container' class:animate={animate} class:disableAnimationOnMobile={disableAnimationOnMobile} bind:this={rootEle} style={`${channelsStyle()};${xPostiion()}`}>
      {#each data as {content, render, active, props}, index}
        <div class='channel' class:active={active} class:inactive={!active} style={channelStyle()}>
          <div class='channel__inner' on:click={() => {onChannelClick && onChannelClick(index)}} class:clickable={!!onChannelClick} class:outline={outline} class:nopadding={nopadding} class:selfContained={selfContained} bind:this={ele} style={innerStyle} >
            {#if render || !lazyLoad}
              {#if touchEnabled|| dragEnabled}
                <div class={`channel-touchable`} 
                     class:will-transition-left={closeThresholdDir() === 'left'} 
                     class:will-transition-right={closeThresholdDir() === 'right'} 
                     class:tracking={tracking} 
                     on:touchstart={touchEnabled && !animating && onTouchStart}
                     on:touchend={touchEnabled && !animating && onTouchEnd}
                     on:touchmove={touchEnabled && !animating && onTouchMove}
                     on:mousedown={dragEnabled && !animating && onMouseDown} 
                     on:mouseup={dragEnabled && !animating && onMouseUp} 
                     on:mousemove={dragEnabled && !animating && onMouseMove} 
                     bind:clientWidth={touchWidth}>
                  <svelte:component this={content} {...props}/>
                </div>
              {:else}
                <svelte:component this={content} {...props}/>
              {/if}
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
    position: relative;
    overflow: hidden;
  }

  .clickable{
    cursor: pointer
  }

  .channel-number{
    position: absolute;
    top: 10px;
    right: 30px;
    z-index: 1;
    padding: 5px;        
    background: rgba(0, 0, 0, 0.5);
    color: var(--white-0);
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);  
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

      .channel-touchable{
        transition: 0.1s;

        &.will-transition-left{
          opacity: 0.2;
          transform: scale(0.7)
        }
        &.will-transition-right{
          opacity: 0.2;
          transform: scale(0.7)          
        }


        &.tracking{
          transition: 0;
          transform: scale(0.95)
        }
      }

      &.outline{
        border: 1px dotted var(--white-0);
      }

      &.nopadding{
        padding: 0;
      }

      &.selfContained{
        width: 100%;
        height: 100vh;
        padding: 0;
        overflow: hidden;
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

