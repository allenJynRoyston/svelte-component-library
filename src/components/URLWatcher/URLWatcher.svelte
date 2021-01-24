<script>
  import {onMount, onDestroy, getContext} from 'svelte'
  import {Channels} from '../index'

  //--------------------------- APP CONTEXT   
  const findUserByUsername = getContext('findUserByUsername') 
  //---------------------------      

  //--------------------------- VARS    
  let ready = false  

  let viewing = window.localStorage.getItem('viewing')  
      viewing = JSON.parse(viewing) || null      

  let friendStatus = window.localStorage.getItem('friendstatus')  
      friendStatus = JSON.parse(friendStatus) || null
      friendStatus = !!friendStatus ? friendStatus.title : friendStatus   

  const channelProps = {
     data: [
      {type: 'feed', render: true, props: {feedOwnerId: viewing && viewing._id, friendStatus}},
    ],
    current: 0,
    transition: {
      ease: 'cubicOut',
      speed: 600
    },
    channelReady: (index) => {
      channelProps.data = channelProps.data.map((x, i) => {
        if(i === index){
          x.render = true
        }
        return x
      })
    },
    onNext: () => {
      // console.log(val)
    },
    onPrev: () => {
      // console.log(val)
    },
  }      
  //---------------------------

  //--------------------------- ONMOUNT
  onMount(async() => {
    window.addEventListener("hashchange", locationHashChanged, false)    
    ready = true
  })  

  onDestroy(() => {
    if(ready){
      window.removeEventListener("hashchange", locationHashChanged)
    }
  })      
  //---------------------------

  //--------------------------- EVENT HANDLERS
  const locationHashChanged = async() => {
    const parts = window.location.hash.split('/')
    const type = parts[1]
    const id = parts [2]

    switch(type){
      case 'feed':
        let user = await findUserByUsername(id)      
        // TODO: add check to go back to home if it's your data        
        // TODO: then do look to get friendStatus
        channelProps.data = [...channelProps.data, {type, render: false, props: {feedOwnerId: user._id, friendStatus}} ]
        channelProps.current = channelProps.data.length - 1      
      break;
    }
  }  

  const removeChannel = () => {
    channelProps.data.splice(channelProps.current, 1)
    channelProps.current = channelProps.data.length - 1   
  }

  //---------------------------

  //--------------------------- $
  //---------------------------    

  


</script>

<div style='display: flex; max-width: 300px; width: 100%; justify-content: space-between'>
  <button on:click={() => {channelProps.current = 0}}>Home</button>
  <button on:click={() => {channelProps.current++}}>+ Channel</button>
  <button on:click={() => {channelProps.current--}}>- Channel</button>

  {#if channelProps.data.length > 1}
    <button on:click={removeChannel}>Remove</button>
  {/if}
</div>

<Channels {...channelProps} />

<style lang='scss'>

</style>