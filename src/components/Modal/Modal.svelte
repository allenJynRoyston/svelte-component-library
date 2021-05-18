<script lang='ts'>
  import {getContext} from 'svelte'
  import {openModal, modalBusy, modalProps} from '../../stores/store'
  import InnerContainer from '@components/InnerContainer/InnerContainer.svelte'  
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte';
  import SVG from '@components/SVG/SVG.svelte';
  import Button from '@components/Button/Button.svelte';
    
  export let show = false;
  export let closeOnBackdrop = false;

  const theme:string = getContext('theme')
  const colors:any = getContext('colors')

  let w = 0;
  let h = 0;
  let ih = 0;
  let freezeAnimation = true;
  let freezeTimer = null;

  let animateIn = false;
  let animateInTimer = null;

  const closeBtn = () => {
    $openModal = false;
  }

  const hasAButton = $modalProps?.onConfirm || $modalProps?.onCancel

  $: style = `top: calc(50% - ${h/2}px); left: calc(50% - ${w/2}px);`

  $: {
    freezeAnimation = false;
    animateIn = true;
        
    if(show){
      clearTimeout(freezeTimer);
      freezeTimer = setTimeout(() => {
        freezeAnimation = true;
      }, 300)      

    }
    else{
      clearInterval(animateInTimer);
      animateInTimer = setTimeout(() => {
        animateIn = false;
        $modalProps = null
      }, 300)      
    }
  }
</script>


<div class={`modal`}  class:show={animateIn}>
  <div class='inner'>

    <div class={`backdrop ${theme}-theme`} on:click={() => {!$modalBusy && ($openModal = false)}} class:animateIn={show} />

    <div class={`container ${theme}-theme`} {style} class:freezeAnimation={freezeAnimation}  class:animateIn={show} bind:clientWidth={w} bind:clientHeight={h} >

      <div class='header'  class:busy={$modalBusy}>
        <TwoSlot showLeft showRight>
          <h2>{$modalProps?.title}</h2>        
          <div slot='right'>
            <SVG onClick={() => {!$modalBusy && closeBtn()}} icon={$modalBusy ? 'save' : 'cross'} fill={colors.white[0].color}/>
          </div>
        </TwoSlot>
      </div>    

      <div class='container-inner' class:hasFooter={$modalProps?.onConfirm || $modalProps?.onCancel} class:busy={$modalBusy}>
        <svelte:component this={$modalProps?.content.component} {...$modalProps?.content.props} />
      </div>

      {#if $modalProps?.onConfirm || $modalProps?.onCancel}
        <div class='footer'>
          <slot name='footer'>
            <div class='default-footer'>
              {#if $modalProps?.onCancel}
                <Button disabled={$modalBusy} type={$modalProps?.cancelBtn?.type || 'primary'} size="small" onClick={() => {!$modalBusy && $modalProps?.onCancel()}}>
                  {$modalProps?.cancelBtn?.text || 'Cancel'}
                </Button>
              {/if}

              {#if $modalProps?.onConfirm}
                <Button disabled={$modalBusy} type={$modalProps?.confirmBtn?.type || 'primary'} hollow size="small" onClick={() => {!$modalBusy && $modalProps?.onConfirm()}}>
                  {$modalProps?.confirmBtn?.text || 'Confirm'}
                </Button>
              {/if}              
            </div>
          </slot>
        </div>
      {/if}
      
    </div>

  </div>
</div>

<style lang='scss' scoped>
  @import '../../scss/src/_media-queries.scss';

  $modalZindex: 50;
  $modalBGZIndex: 1;
  $modalContentZIndex: 2;

  .modal{
    position: fixed; 
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    &.show{
      z-index: $modalZindex;
      display: flex;
      justify-content: center;
      align-items: center;
    }   

    .inner{
      position: relative;
      width: 100%;
      height: 100%;
    }

    .backdrop{
      position: absolute;
      z-index: $modalBGZIndex;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--black-1);
      color: var(--black-1-text);        
      cursor: pointer;
      opacity: 0;
      transition: 0.3s;

      &.animateIn{
        opacity: 0.7;
      }

    }        

    .container{ 
      position: absolute;
      z-index: $modalContentZIndex;   
      width: 100vw;
      height: auto;
      overflow: hidden;
      transform: translateY(100%);
      opacity: 0;
      transition: 0.3s;
      border-radius: 0px;    
      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.25);  
      display: flex;
      flex-direction: column;
      background: var(--black-2);
      color: var(--black-2-text);     

      @include desktop-and-up {     
        border-radius: 10px;
      }           

      .header{
        display: flex;
        height: 50px;
        padding: 0 10px;        
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.25);  
        &.busy{
          opacity: 0.5;
        }           
      }

      .footer{
        display: flex;        
        height: 40px;        
        box-shadow: -5px -5px 15px rgba(0, 0, 0, 0.25);  
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        padding: 10px;
      }

      .default-footer{
        width: 100%;
        display: flex;    
        gap: 10px;
        padding: 10px;         
        @include desktop-and-up {     
          width: auto;
        }            
      }

      .container-inner{
        padding: 10px;
        height: 100vh;
        max-height: calc(100vh - 70px);        
        overflow-y: auto;   
        background: var(--black-1);
        color: var(--black-1-text);           

        &.hasFooter{
          max-height: calc(100vh - 130px);        
        }


        @include desktop-and-up {     
          height: auto;
          max-height: calc(600px - 100px);
          &.hasFooter{
            max-height: calc(600px - 130px);        
          }          
        }     

        &.busy{
          opacity: 0.5;
          overflow-y: hidden;
        }        
      }


      &.freezeAnimation{
        transition: 0s;
      }

      &.animateIn{
        transform: translateY(0);
        opacity: 1;
      }

      @include desktop-and-up {
        width: calc(50% - 20px);     
        max-height: 600px;
      }      
      
    }
    


  }



</style>