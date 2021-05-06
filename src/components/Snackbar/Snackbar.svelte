<script lang="ts">
//--------------------------- IMPORTS  
import { onDestroy } from 'svelte';
import SVG from '../SVG/SVG.svelte'
import Link from '../Link/Link.svelte'

export let onComplete = () => {};
export let snack = null;

let currentSnack = null;
let eventTimers = [];
let removeTimers = [];
let snacks = []


//--------------------------- ONMOUNT
onDestroy(() => {
  eventTimers.forEach(et => {
    clearTimeout(et.timer)
  })

  removeTimers.forEach(timer => {
    clearTimeout(timer)
  })
})
//---------------------------     

//--------------------------- EVENT HANDLERS
const processSnack = () => {
  snacks = snacks.map((s, i) => {
    if(!s.processed){
      if(s?.duration && s.duration > 1000){
        const timer = setTimeout(() => {
          s.animateIn && animateOutSnack(s)          
        }, s.duration)
        eventTimers = [...eventTimers, {id: s.id, timer}]
      }
    }
    return s
  })
}

const animateOutSnack = (snack, force = false) => {  
  if(snack?.duration || force){
    snacks = snacks.map(x => {
      if(x.id === snack.id){
        x.animateIn = false;
      }
      return x
    })
    const removeTimer = setTimeout(() => {       
      clearTimeout(removeTimers[0])
      removeSnack(snack)
    }, 200)  
    removeTimers = [...removeTimers, removeTimer]     
  }     
}

const cancelTimer = (id) => {  
  snacks = snacks.map(x => {
    if(id === x.id){
      x.duration = null
    }
    return x
  })
  const event = eventTimers.find(x => x.id === id)  
  event?.timer && clearInterval(event.timer)  
}

const removeSnack = (snack) => {
  snacks = snacks.filter(s => {return s.id !== snack.id})  
  eventTimers = eventTimers.filter(t => {return t.id !== snack.id})
  onComplete()
}

const newSnack = async() => {
  const id = Math.random().toString(36).substring(7);
  snack = {...snack, processed: false, animateIn: true, id}
  currentSnack = snack;
  snacks = [...snacks, snack]
  processSnack()
}
//---------------------------

const returnIconColor = (type) => {
  switch(type){
    case 'primary': 
    return 'lightblue'    
    case 'success': 
    return 'green'
    case 'warning': 
    return 'orange'
    case 'error': 
    return 'red'
  }  
}

const returnIcon = (type) => {
  switch(type){
    case 'primary': 
    return 'notification'    
    case 'success': 
    return 'like'
    case 'warning': 
    return 'warning'
    case 'error': 
    return 'sad'
  }  
}

//---------------------------
$: {
    snack !== currentSnack && newSnack()
}
//---------------------------

</script>

<div class='snackbar'>
  {#each snacks as snack (snack.id)}
    <div class={`snack ${snack.type}`} on:mouseenter={() => {cancelTimer(snack.id)}} class:animateIn={snack.animateIn} class:animateOut={!snack.animateIn} >

      <div class='icon'>
        <SVG icon={returnIcon(snack.type)} fill={returnIconColor(snack.type)} />
      </div>

      
      <div class='content' class:content-padding={snack?.component}>
        {#if snack?.message}
          {snack.message}
        {/if}
        {#if snack?.component}
          <svelte:component this={snack?.component} {...snack?.props} />
        {/if}
      </div>
    

      <div class='close-btn' on:click={() => {animateOutSnack(snack, true)}}>
        <SVG icon={snack?.duration ? 'unlocked' : 'cross' } fill='white' size={12} />
      </div>
    </div>
  {/each}
</div>

<div class='test'>

</div>

<style lang='scss'>
  .snackbar{
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 100;  
    overflow: hidden;  
    display: flex;
    flex-direction: column-reverse
  }

  .snack{
    background: #0A0B0B;
    padding-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    min-width: 150px;
    font-size: 12px;

    &:hover{
      background: #262B2A
    }

    &.primary{
      color: lightblue;
    }

    &.success{
      color: green;
    }

    &.warning{
      color: orange;
    }   

    &.error{
      color: red;
    }    

    &:not(:last-child){
      margin-top: 10px;
    }

    &.animateOut{
      opacity: 0;
      transform: translateX(100%);
      transition: 300ms;
    }
    
    &.animateIn{
      opacity: 1;
      transform: translateX(0);
    }


    .icon{
      padding-right: 10px;
    }

    .content{
      flex: 1 1 auto;
      text-align: left;
      font-weight: bold;

      &.content-padding{
        padding: 10px 0;
      }
    }

    .close-btn{
      padding: 10px;
      cursor: pointer;
    }

  }

</style>
