<script>
  import {onMount} from 'svelte'  
  import Loader from '../Loader/Loader'
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

  export let data = []
  export let current = 0
  export let afterUpdate = null;
  export let channelReady = null;
  export let transition = {
              easing: 'cubicOut',
              speed: 400
            }
  export let buttons = false;

  let ready = false
  let xpos;
  let currentChannel = current;
  let busy = false

  const createSizeTables = () => {
    const table = []
    const chunk = (100 / data.length).toFixed(4)
    data.forEach((x, i) => {
      table.push(-(i * chunk))
    })
    return table
  }

  onMount(() => {
    const table = createSizeTables()
    // set xxpos to be tweened
    xpos = tweened(table[currentChannel], {
      duration: transition.speed,
      easing: cubicOut
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

  const next = async() => {
    if(!busy && currentChannel < data.length - 1){
      busy = true;
      currentChannel = currentChannel + 1
      draw()
    }    
  }

  const prev = async() => {
    if(!busy && currentChannel > 0){
      busy = true;    
      currentChannel = currentChannel - 1
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

<div class='channels'>

  {#if buttons}
    <button on:click={() => {goto(0)}}>Home</button>
    <button on:click={next}>+ Channel</button>
    <button on:click={prev}>- Channel</button>   
  {/if}

  {#if ready}
    <div class='channels-container' style={`${channelsStyle()};${xPostiion()}`}>
      {#each data as {content, render, active, props}}
        <div class='channel' class:active={active} class:inactive={!active} style={channelStyle()}>
          <div class='channel__inner'>
            {#if render}
              <svelte:component this={content} {...props} />
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
    transition: 400ms;

    &.inactive{
      opacity: 0;
    }

    &.active{
      opacity: 1
    }     
    
    &__inner{    
      width: 100%;
    }
  }
</style>