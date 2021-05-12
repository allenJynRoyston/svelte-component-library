<script lang='ts'>
  import Channels from '../../../components/Channels/Channels.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import LoremBlock from '../../../components/LoremBlock/LoremBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import {createChannel} from '../../../js/utility'


   //--------------------------- CHANNEL
   const channel = createChannel({
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

  const gotoChannel = (index) => {
    channel.current = index
  }    
  //---------------------------   
  

</script>

<h2>Channels</h2>
<hr>




<LibraryBlock title="Default:">
    <div class='button-block'>
      {#each channel.data as ch, index}
        <button on:click={() => {gotoChannel(index)}}>{index}</button>    
      {/each}
    </div>

    <div style='height: 200px'>
      <Channels {...channel} />
    </div>
</LibraryBlock>

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

<CodeBlock open title='Example:' snippet={`
  //--------------------------- IMPORT
  import {createChannel} from '....../js/utility'

  //--------------------------- CHANNEL
  const channel = createChannel({
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

  const gotoChannel = (index) => {
    channel.current = index
  }    
  //---------------------------   

  <Channels {...channel} />
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