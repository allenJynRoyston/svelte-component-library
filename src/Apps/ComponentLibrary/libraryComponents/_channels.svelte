<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'
  import Channels from '@components/Channels/Channels.svelte'
  import {createChannel} from '@js/utility'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'Channels',
    importName: '@components/Channels/Channels.svelte',
    properties: `
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
    `,
    props: {
      backtotop: false,
      nopadding: false,
      animate: true,
      nomargin: false,
      exactfit: false,
      disableAnimationOnMobile: false
    }, 
    dropdowns: [
      {
        label: 'duration',
        options: [400, 700, 1000], 
        value: 0        
      },
      {
        label: 'easing',
        options: ['cubicOut'], 
        value: 0        
      }      
    ]
  }  

  $: livecode = `  
      import {createChannel} from '@js/utility'

      const channels = createChannel({
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

      <Channels {...channels} ${fullstr} />
     `  

  $: code = `
    import {createChannel} from '@js/utility'

    const channels = createChannel({
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

    <Channels {...channels} ${propstr} /> 
  `

   //--------------------------- CHANNEL
   const channels = createChannel({
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
  
  const animatedChannels = createChannel({
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

<LibrarySnippet {...snippet} {livecode} {code} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <div class='button-block'>
      {#each channels.data as ch, index}
        <button on:click={() => {channels.current = index}}>{index + 1}</button>    
      {/each}
    </div>

    <div style='height: 200px'>
      <Channels {...channels}  {...props} {...selectprops} />
    </div>
   </div>    

   <div slot='example'>
      <div class='button-block'>
        {#each animatedChannels.data as ch, index}
          <button on:click={() => {animatedChannels.current = index}}>{index + 1}</button>    
        {/each}
      </div>
    
      <div style='height: 200px'>
        <Channels {...animatedChannels} {...props} />
      </div>
   </div>
</LibrarySnippet>









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