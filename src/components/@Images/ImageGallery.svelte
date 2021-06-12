<script lang='ts'>
  import {getContext} from 'svelte'
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
  export let touchEnabled = false;
  export let dragEnabled = false;
  export let lazyLoad = true;
  export let useModalOnClick = false;

  export let onClick = null;

  let touchActive = false;
  let animating = false;
  
  const theme:string = getContext('theme')
        
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

  const onRightThreshold = () => {
    onNext();
  }

  const onLeftThreshold = () => {
    onPrev();
  }  

  const onRedraw = (state) => {
    animating = state;
  }

  const onMoveStart = () => {
    touchActive = true;
  }

  const onMoveEnd = () => {
    touchActive = false;
  }  

  $: busy = touchActive || animating

</script>


<div class='image-gallery'>
  <div class='gallery'>
    <Channels showInactive animate={!touchActive} showChannelNumber nopadding embedded {dragEnabled} {touchEnabled} {onChannelClick} {onRightThreshold} {onLeftThreshold} {onMoveStart} {onMoveEnd} {onRedraw} {...channels} {lazyLoad} {easing} {duration} />
      
      {#if showArrows && channels.current > 0}
        <div class='left-arrow' class:busy={busy} on:click={onPrev} >
          <SVG icon='arrow-left' size={30} />
        </div>    
      {/if}

      {#if showArrows && channels.current < channels.data.length - 1}
        <div class='right-arrow' class:busy={busy} on:click={onNext}>
          <SVG icon='arrow-right'  size={30} />
        </div>        
      {/if}
  
  </div>

  {#if showButtons}
    <div class='buttons'>
      {#each channels.data as _channel, index}
        <button class={`${theme}-theme`} class:isActive={channels.current === index} on:click={() => {channels.current = index}}>•</button>
      {/each}
    </div>
  {/if}  
</div>




<style lang="scss" scoped>  
  .image-gallery{
    width: 100%;
    height: auto;
    position: relative;
    // background: var(--black-2);

    .gallery{
      position: relative;
    }

    .buttons{
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 5px;
      margin-top: 5px;

      button{
        border: none;
        background: none;
        cursor: pointer;
        font-size: 35px;
        color: var(--black-2);

        &.isActive{
          color: var(--primary-2)!important;
        }

        &.dark-theme{
          color: var(--white-2);
          &.isActive{
            color: var(--primary-2)!important;
          }          
        }

        &:hover{
          color: var(--primary-2)
        }        
        &:active{
          color: var(--primary-5);
        }             
      }
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
      &.busy{
        opacity: 0.2;
        pointer-events: none;
      }
      // background: linear-gradient(to left, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
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
      &.busy{
        opacity: 0.2;
        pointer-events: none;        
      }      
      // background: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
    }    
  }
</style>
