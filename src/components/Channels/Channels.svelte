<script>
  import {onMount} from 'svelte'
  import {FeedContainer, TestUtility, FormExample} from '../index'

	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

  export let data = []
  export let current = 0
  export let onNext = null;
  export let onPrev = null;
  export let transition = {
              easing: 'cubicOut',
              speed: 400
            }

  let ready = false
  let sizeTables = {}
  let xpos;
  let currentChannel = current

  const createSizeTables = () => {
    for(let n = 1; n <= 100; n ++){
      let isEven = n & 1 ? false : true
      
      if(isEven){
        let sizeInPercentage = ((1/n)/2*100) 
        let halved = Math.floor(n/2)    
        let table = []                
        for(let i = 1; i <= halved; i++){          
          const p = sizeInPercentage * (n - (i *2) + 1)
          table.push(parseFloat(p.toFixed(4)))
        }
        for(let i = halved; i > 0; i--){
          const p = sizeInPercentage * (n - (i *2) + 1)
          table.push(-parseFloat(p.toFixed(4)))
        }         
        sizeTables[n] = {table}      
      }

      else{
        let sizeInPercentage = ((1/n)*100) 
        let halved = Math.floor(n/2)  
        let table = []

        for(let i = halved; i > 0; i--){
          const p = sizeInPercentage * i
          table.push(parseFloat(p.toFixed(4)))
        }
        table.push(n === 0 ? 100 : 0)
        for(let i = 1; i <= halved; i++){
          const p = sizeInPercentage * i
          table.push(-parseFloat(p.toFixed(4)))
        }    
        sizeTables[n] = {table}        
      }      
    }
  }

  onMount(() => {
    // first, creates a size table that we use for reference
    createSizeTables()

    // reference table
    let {table} = sizeTables[data.length]

    // set xxpos to be tweened
    xpos = tweened(table[currentChannel], {
      duration: transition.speed,
      easing: cubicOut
    });  

    ready = true
  })

  const next = async() => {
    let {table} = sizeTables[data.length]
    currentChannel = currentChannel + 1 > data.length - 1 ? data.length - 1 : currentChannel + 1
    let val = table[currentChannel]
    await xpos.set(val)
    onNext && onNext()    
  }

  const prev = async() => {
    let {table} = sizeTables[data.length]
    currentChannel = currentChannel - 1 < 0 ? 0 : currentChannel - 1
    let val = table[currentChannel]
    await xpos.set(val)
    onPrev && onPrev()    
  }

  $: watchChange = () => {
    if(currentChannel !== current){
      if(current > currentChannel){
        next()
      }
      if(current < currentChannel){
        prev()
      }
    }
    return true
  }

  $: xPostiion = () => {
    return `transform: translateX(${$xpos}%); `
  }

  $: channelsStyle = () => {
    return `width: ${data.length * 100}%;`
  }

  $: channelStyle = () => {
    return `width: calc(${((1 / data.length)*100).toFixed(4)}% - 40px); padding: 0 20px`
  }  
  
</script>

{#if ready && watchChange()}
  <div class='channels' style={`${channelsStyle()};${xPostiion()}`}>
    {#each data as {type, props}, index}
      <div class='channel' style={channelStyle()}>
        <div class='channel__inner'>
          {#if type === 'feed'}          
            <FeedContainer {...props}/>
          {/if}
          {#if type === 'form'}
            <FormExample />
          {/if}   
        </div>     
      </div>
    {/each}
  </div> 
{/if}

<style lang='scss' scoped>
  .channels{
    height: 100vh;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    will-change: transform;
  }

  .channel{
    height: calc(100%);
    overflow-y: auto;

    &__inner{
      width: 100%
    }
  }
</style>