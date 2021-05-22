<script lang='ts'>
  import {getContext} from 'svelte'
  import {ModalStore} from '@store/store'
  import InnerContainer from '@components/InnerContainer/InnerContainer.svelte'  
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte';
  import SVG from '@components/SVG/SVG.svelte';
  import Button from '@components/Button/Button.svelte';
    
  export let show = false;
  export let closeOnBackdrop = false;

  const theme:string = getContext('theme')
  const colors:any = getContext('colors')

  const {modalIsOpen, modalIsBusy, modalProps, setModalState} = ModalStore

  let w = 0;
  let h = 0;
  let ih = 0;
  let freezeAnimation = true;
  let freezeTimer = null;

  let animateIn = false;
  let animateInTimer = null;

  const closeBtn = () => {
    setModalState(false)
  }

  $: getLocation = (reset) => {
    switch(reset ? 'center' : $modalProps?.location || 'center') {
      case 'left':
        return `top: calc(50% - ${h/2}px); left: 0`
        break;
      case 'right':
        return `top: calc(50% - ${h/2}px); right: 0`
        break;
      case 'corner-left':
        return `bottom: 0; left: 0`
        break;
      case 'corner-right':
        return `bottom: 0; right: 0`
        break;        
      case 'center':     
        return `top: calc(50% - ${h/2}px); left: calc(50% - ${w/2}px);`
    }
  }

  $: style = getLocation()

  $: full = $modalProps?.location === 'left' || $modalProps?.location === 'right'

  $: fullcorner = $modalProps?.location === 'corner-left' || $modalProps?.location === 'corner-right'

  $: defaultType = $modalProps?.type || 'primary'

  $: defaultBackdrop = $modalProps?.backdrop || 'dark'

  $: {
    freezeAnimation = true;
        
    if(show){     
      animateIn = true;
      setTimeout(() => {
        freezeAnimation = false
        clearTimeout(freezeTimer);
        freezeTimer = setTimeout(() => {
          freezeAnimation = true;
        }, 300)              
      })

    }
    else{      
      freezeAnimation = false;
      clearInterval(animateInTimer);
      animateInTimer = setTimeout(() => {
        animateIn = false;
      }, 300)      
    }
  }
</script>


<div class={`modal`}  class:show={animateIn}>
  <div class='inner'>

    <div class={`backdrop ${defaultBackdrop}`} on:click={closeBtn} class:animateIn={show} />

    <div class={`container ${$modalProps?.location || 'center'}  ${defaultType}`} {style} class:freezeAnimation={freezeAnimation} class:shadow={$modalProps?.shadow} class:rounded={$modalProps?.rounded} class:animateIn={show} class:animateOut={!show} class:full={full} bind:clientWidth={w} bind:clientHeight={h} >

      <div class='header'  class:busy={$modalIsBusy}>
        <TwoSlot showLeft showRight>
          <h2>{$modalProps?.title || 'Unavailable'}</h2>        
          <div slot='right'>
            <SVG onClick={() => {!$modalIsBusy && closeBtn()}} icon={$modalIsBusy ? 'save' : 'cross'} fill={colors[defaultType][4].textFriendlyColor}/>
          </div>
        </TwoSlot>
      </div>    
      
      <div class={`container-inner  ${defaultType}`} class:nopadding={$modalProps?.nopadding} class:full={full} class:hasFooter={$modalProps?.onConfirm || $modalProps?.onCancel} class:busy={$modalIsBusy}>
        {#if !!$modalProps?.content.component}
          <svelte:component this={$modalProps?.content.component} {...$modalProps?.content.props} />
        {:else}
          <div style='text-align: center; padding: 20px 0;'>
            ¯\_(ツ)_/¯
          </div>
        {/if}
      </div>

      {#if $modalProps?.onConfirm || $modalProps?.onCancel}
        <div class='footer'>
          <slot name='footer'>
            <div class='default-footer' class:full={fullcorner || full}>
              {#if $modalProps?.onCancel}
                <Button disabled={$modalIsBusy} type={$modalProps?.cancelBtn?.type || (defaultType)} size="small" onClick={() => {!$modalIsBusy && $modalProps?.onCancel()}}>
                  {$modalProps?.cancelBtn?.text || 'Cancel'}
                </Button>
              {/if}

              {#if $modalProps?.onConfirm}
                <Button disabled={$modalIsBusy} type={$modalProps?.confirmBtn?.type || (defaultType)} hollow size="small" onClick={() => {!$modalIsBusy && $modalProps?.onConfirm()}}>
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
      cursor: pointer;
      opacity: 0;
      transition: 0.3s;

      &.light{
        background: var(--white-5);
        color: var(--white-5-text);          
      }

      &.dark{
        background: var(--black-1);
        color: var(--black-1-text);          
      }      

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
      transition: 0.3s;
      border-radius: 0px;    
      display: flex;
      flex-direction: column;
      background: var(--primary-6);
      color: var(--primary-6-text);       

      &.full{
        height: 100vh;        
      }

      &.black{
        background: var(--black-4);
        color: var(--black-4-text);       
      }

      &.white{
        background: var(--white-6);
        color: var(--white-6-text);       
      }      

      &.primary{
        background: var(--primary-4);
        color: var(--primary-4-text);       
      }      

      &.secondary{
        background: var(--secondary-4);
        color: var(--secondary-4-text);       
      }         

      &.magic{
        background: var(--magic-4);
        color: var(--magic-4-text);       
      }      

      &.success{
        background: var(--success-4);
        color: var(--success-4-text);       
      }         

      &.warning{
        background: var(--warning-4);
        color: var(--warning-4-text);       
      }         

      &.danger{
        background: var(--danger-4);
        color: var(--danger-4-text);       
      }         
                       



      &.shadow{
        box-shadow: none;
        @include desktop-and-up {     
          &.center{
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);  
          }

          &.left{
            box-shadow: 15px 0px 10px rgba(0, 0, 0, 0.25);  
          }  

          &.right{
            box-shadow: -15px 0px 10px rgba(0, 0, 0, 0.25);  
          }   

          &.corner-left{
            box-shadow: 5px -5px 10px rgba(0, 0, 0, 0.25);  
          }  

          &.corner-right{
            box-shadow: -5px -5px 10px rgba(0, 0, 0, 0.25);  
          }  
        }
      }      

      &.rounded{
        @include desktop-and-up {     
          &.center{
            border-radius: 10px;
          }

          &.left{
            border-radius: 0 10px 10px 0;
          }  

          &.right{
            border-radius: 10px 0 0 10px;
          }   

          &.corner-left{
            border-radius: 0 10px 0 0;
          }  

          &.corner-right{
            border-radius: 10px 0 0 0;
          }                              
        }           
      }

      @include desktop-and-up {
        width: calc(50% - 20px);     
        max-height: 600px;
        &.full{
          max-height: 100vh;
        }
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
          &.full{
            width: 100%;
          }                   
        }            
      }

      .container-inner{
        padding: 10px;
        height: 100vh;
        max-height: calc(100vh - 70px);        
        overflow-y: auto;   

        &.black{
          background: var(--black-6);
          color: var(--black-6-text);       
        }

        &.white{
          background: var(--white-7);
          color: var(--white-7-text);       
        }      

        &.primary{
          background: var(--primary-6);
          color: var(--primary-6-text);       
        }      

        &.secondary{
          background: var(--secondary-6);
          color: var(--secondary-6-text);       
        }         

        &.magic{
          background: var(--magic-6);
          color: var(--magic-6-text);       
        }      

        &.success{
          background: var(--success-6);
          color: var(--success-6-text);       
        }         

        &.warning{
          background: var(--warning-6);
          color: var(--warning-6-text);       
        }         

        &.danger{
          background: var(--danger-6);
          color: var(--danger-6-text);       
        }           
        
        &.nopadding{
          padding: 0px;
        }

        &.dark-them{
          background: var(--black-1);
          color: var(--black-1-text);                   
        }                  

        &.hasFooter{
          max-height: calc(100vh - 130px);        
        }


        @include desktop-and-up {     
          height: auto;
          max-height: calc(600px - 100px);
          &.hasFooter{
            max-height: calc(600px - 130px);        
          }     
          &.full{
            height: 100vh;
            max-height: 100vh;
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
        opacity: 1;  
      }

      &.animateOut{
        &.center{
          opacity: 0;
          transform: translateY(100%);
        }

        &.right{
          opacity: 0.8;
          transform: translateX(100%);
        }
        &.left{
          opacity: 0.8;
          transform: translateX(-100%);
        }

        &.corner-left{
          opacity: 0.8;
          transform: translateY(100%);
        }
        &.corner-right{
          opacity: 0.8;
          transform: translateY(100%);
        }        
      }

    }

  }

</style>