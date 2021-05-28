<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';
  import ExampleBlock from '../components/ExampleBlock.svelte'

  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'
  import Channels from '@components/Channels/Channels.svelte'
  import Container from '@components/Container/Container.svelte'
  import {createChannel} from '@js/utility'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

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
    notes: [
      'Embedded should be set to true for this demo.'      
    ],
    props: {
      backtotop: false,
      nopadding: false,
      animate: true,
      selfContained: false,      
      disableAnimationOnMobile: false,
      outline: false,
      showChannelNumber: true,
      embedded: true,
    }, 
    dropdowns: [
      {
        label: 'easing',
        options: [
          'linear', 'backIn', 'backOut', 'bounceIn', 'bounceInOut', 'bounceOut', 'circIn', 'circInOut', 'circOut', 'cubicIn', 'cubicInOut', 'cubicOut',
          'elasticIn', 'elasticInOut', 'elasticOut', 'expoIn', 'expoInOut', 'expoOut', 'quadIn', 'quadInOut', 'quadOut', 
          'quartIn', 'quartInOut', 'quartOut', 'quintIn', 'quintInOut', 'quintOut', 'sineIn', 'sineInOut', 'sineOut'
        ], 
        value: 0        
      }      
    ],
    inputs: [
      {forprop: 'duration', value: 400, renderAs: 'input', componentprop: {type: 'number'}},
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

      <Channels {...channels} ${propstr}${selectstr}${inputstr} />
     `  

   //--------------------------- CHANNEL
   const channels = createChannel({
     current: 0,
     data: [
        {content: ExampleBlock},
        {content: ExampleBlock},
        {content: ExampleBlock},
        {content: ExampleBlock},
        {content: ExampleBlock}
    ]
  })   
  //---------------------------   
  

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <div class='button-block'>
      {#each channels.data as ch, index}
        <button on:click={() => {channels.current = index}}>{index + 1}</button>    
      {/each}
    </div>

    <div style='height: 400px'>     
      <Container offset={2}> 
        <Channels {...channels}  {...props} {...selectprops} {...inputprops} />
      </Container>
    </div>
   </div>    
</LibrarySnippet>









<style lang='scss' scoped>
  .button-block{
    margin: 10px 0;
    display: flex; 
    gap: 5px    
  }

  button{
    cursor: pointer;
    color: black;
  }

</style>