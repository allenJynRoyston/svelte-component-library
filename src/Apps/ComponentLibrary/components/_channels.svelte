<script lang='ts'>
  import Channels from '@components/Channels/Channels.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
  import {createChannel} from '@js/utility'


   //--------------------------- CHANNEL
   const channel = createChannel({
     current: 0,
     data: [
        {content: LoremBlock, props: {content: 'Channel 1'}},
        {content: LoremBlock, props: {content: 'Channel 2'}},
        {content: LoremBlock, props: {content: 'Channel 3'}},
        {content: LoremBlock, props: {content: 'Channel 4'}},
        {content: LoremBlock, props: {content: 'Channel 5'}},
        {content: LoremBlock, props: {content: 'Channel 6'}},
        {content: LoremBlock, props: {content: 'Channel 7'}},
        {content: LoremBlock, props: {content: 'Channel 8'}},
        {content: LoremBlock, props: {content: 'Channel 9'}},
        {content: LoremBlock, props: {content: 'Channel 10'}}
    ]
  })   
  
  const channelTwo = createChannel({
     current: 0,
     data: [
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
    ]
  })  
  //---------------------------   
  

</script>

<h2>Channels</h2>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Channels from '@components/Channels/Channels.svelte'
  `} />

<CodeBlock title='Properties:' snippet={`
  export let data = []
  export let current;
  export let afterUpdate = null;
  export let channelReady = null;
  export let duration = 400;
  export let easing = 'cubicOut'
  export let embedded = false;
  export let backtotop = false;
  export let animate = false;
  
`} />


<LibraryBlock title="Default:">
    <div class='button-block'>
      {#each channel.data as ch, index}
        <button on:click={() => {channel.current = index}}>{index + 1}</button>    
      {/each}
    </div>

    <div style='height: 200px'>
      <Channels {...channel} />
    </div>
</LibraryBlock>





<CodeBlock open title='Example:' snippet={`
  import {createChannel} from '@js/utility'

  //--------------------------- CHANNEL
  const channel = createChannel({
     current: 0,  // set as default, or remove if you don't want a default transistion
     data: [
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock},
        {content: LoremBlock}
    ]
  }) 
  //---------------------------   

  <Channels {...channel} />

`} />  


<LibraryBlock title="Animated:">
  <div class='button-block'>
    {#each channelTwo.data as ch, index}
      <button on:click={() => {channelTwo.current = index}}>{index + 1}</button>    
    {/each}
  </div>

  <div style='height: 200px'>
    <Channels {...channelTwo} animate />
  </div>
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`

  <Channels {...channel} animted/>

`} />  








<style lang='scss' scoped>
  .button-block{
    margin-left: 10px;
    display: flex; 
    gap: 5px    
  }

  button{
    cursor: pointer;
    color: black;
  }

</style>