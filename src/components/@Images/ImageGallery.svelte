<script lang='ts'>
  import {ModalStore} from '@store/store'
  import RImage from '@images/RImage.svelte'      
  import Channels from '@base/Channels.svelte'      
  import {createChannel} from '@js/utility'  
  import SVG from '@base/SVG.svelte'

  export let images = []
  export let easing = 'cubicOut'
  export let duration = 300

  export let showArrows = false;
  export let showButtons = false;
  export let lazyLoad = true;
  export let useModalOnClick = false;

  export let onClick = null;
        
  const {setModalState, modalIsBusy, modalProps} = ModalStore

  const channels = createChannel({
    current: 0,
    data: [
        {content: RImage, props: {src: 'https://picsum.photos/id/22/600/400'}},
        {content: RImage, props: {src: 'https://picsum.photos/id/23/600/400'}},
        {content: RImage, props: {src: 'https://picsum.photos/id/24/600/400'}},
        {content: RImage, props: {src: 'https://picsum.photos/id/25/600/400'}},
    ]
  }) 

  const onNext = () => {
    let c = channels.current + 1
    channels.current = c < channels.data.length - 1 ? c : channels.data.length - 1
  }

  const onPrev = () => {
    let c = channels.current - 1
    channels.current = c > 0 ? c : 0
  }


  const onChannelClick = useModalOnClick || !!onClick ? (index) => {
    if(useModalOnClick){
      setModalState(true)
      $modalProps = {
        naked: true,      
        content: {
          component: RImage, props: {src: channels.data[index].props.src}
        },                
      }
    }
    onClick && onClick(index)    
  } : null


</script>


<div class='image-gallery'>
  <div class='gallery'>
    <Channels showInactive animate showChannelNumber nopadding embedded {onChannelClick} {...channels} {lazyLoad} {easing} {duration} />

    {#if showArrows && channels.current > 0}
      <div class='left-arrow' on:click={onPrev} >
        <SVG icon='arrow-left' size={30} />
      </div>    
    {/if}

    {#if showArrows && channels.current < channels.data.length - 1}
      <div class='right-arrow' on:click={onNext}>
        <SVG icon='arrow-right'  size={30} />
      </div>        
    {/if}
  </div>
</div>

{#if showButtons}
<div class='buttons'>
  {#each channels.data as _channel, index}
    <button on:click={() => {channels.current = index}}>{index}</button>
  {/each}
</div>
{/if}


<style lang="scss" scoped>  
  .image-gallery{
    width: 100%;
    height: auto;
    position: relative;
    background: var(--black-2);

    .gallery{
      position: relative;
    }


    .left-arrow{
      z-index: 1;
      display: flex;
      align-items: center;
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      height: 100%;
      padding: 0 10px;
      background: linear-gradient(to left, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
    }

    .right-arrow{
      z-index: 1;      
      display: flex;
      align-items: center;      
      position: absolute;
      cursor: pointer;      
      top: 0;
      right: 0;
      height: 100%;
      padding: 0 10px;
      background: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
    }    
  }
</style>
