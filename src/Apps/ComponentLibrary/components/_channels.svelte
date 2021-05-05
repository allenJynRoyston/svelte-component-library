<script lang='ts'>
  import Channels from '../../../components/Channels/Channels.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import LoremBlock from '../../../components/LoremBlock/LoremBlock.svelte'
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
<LibraryBlock section>
  <div class='button-block'>
    {#each channel.data as ch, index}
      <button on:click={() => {gotoChannel(index)}}>{index}</button>    
    {/each}
  </div>
  <Channels {...channel} />
</LibraryBlock>   

<style lang='scss' scoped>
  .button-block{
    display: flex; 
    gap: 5px    
  }

  button{
    cursor: pointer;
    color: black;
  }

</style>