<script lang='ts'>
  import {getContext} from 'svelte';
  import {DeviceStore} from '@store/store';
  import FullImage from '../Image/FullImage.svelte';
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'
  import InnerContainer from '@components/InnerContainer/InnerContainer.svelte'

  export let name = 'John Smith';
  export let title = 'title'
  export let profession = 'profession'
  export let applyTheme = 'primary';
  export let imageSrc = null;
  export let bgColor = null;
  export let props = null;
  export let shadow = false;
  export let innerShadow = false;

  const theme:string = getContext('theme')

  let cardWidth = null;
  let contentHeight = null;
  let height = null;

  const {isMobile} = DeviceStore;
  

  const setHeight = () => {
    if(height === null){
      height = contentHeight;
    }
  }

  $: cardSize = () => {
    if( cardWidth >= 720 ){
      return 'large'
    }
    if( cardWidth < 720 && cardWidth > 640 ){
      return 'medium'
    }
    if( cardWidth < 640 && cardWidth > 420  ){
      return 'small'
    }
    if( cardWidth < 420  ){
      return 'tiny'
    }    
  }

  $ : {
    contentHeight !== null && setHeight()
  }
  
</script>

<div class={`profile-card ${theme}-theme`} class:shadow={shadow} bind:clientWidth={cardWidth}>

  {cardSize()}
  <!-- <div class={`profile ${applyTheme}`} class:innerShadow={innerShadow}>
    <div class='inner'>
      <div class='nameplate'>
        {name} {cardWidth}
      </div>
      
      <div class='image'>
        <FullImage src={imageSrc} alt={imageSrc} />
      </div>

      <div class='scoreplate'>
        {profession}
      </div>    
    </div>
  </div>


  <div class='details'>
    <div class='header'>
      <h2>{name}</h2>
    </div>
    <div class='content' bind:clientHeight={contentHeight}>  
      {#if !!height}
        <InnerContainer height={`${height}px`}>
          <slot name='content'>
            <LoremBlock ignoreTheme />
          </slot>
        </InnerContainer>
      {/if}
    </div>
    <div class='footer'>
      <h1>Contact</h1>
    </div>
  </div>   -->
</div>

<style lang='scss'>
  @import "../../scss/src/_media-queries.scss";

  .profile-card{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;    
    background: var(--white-0);
    color: var(--white-0-text);
    overflow: hidden;
    

    &.shadow{
      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.50);  
    }

    &.dark-theme{
      background: var(--black-1);
      color: var(--black-1-text);
    }

    .profile{      
      width: 200px;
      height: 100%;

      @include tablet-landscape-and-up {
        width: 300px;
      }
      
      &.innerShadow{
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.50);  
      }

      .inner{
        height: 100%;
        display: flex;   
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;          
      }

      .nameplate, .scoreplate{
        padding: 2px 10px;
        border-radius: 10px;
      }      

      .image{
        border-radius: 50%;
        width: 100px;
        height: 100px;
        overflow: hidden;      

        @include tablet-landscape-and-up {
          width: 150px;
          height: 150px;
        }
      }
    }


    .profile-mobile{      
      display: flex;   
      padding: 5px 10px;
      width: calc(100% - 20px);
      

      .nameplate, .scoreplate{
        height: 20px;
        font-size: 10px;
      }       

      .image{
        border-radius: 50%;
        width: 35px;
        height: 35px;
        overflow: hidden; 
        margin-right: 10px;             
      }      
    }

    .details{
      width: calc(100% - 20px);
      padding: 20px 10px;      
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 10px;

      .content{
        flex: 1 1 auto;
      }

    }


    .primary{
        background: var(--primary-5);

        .nameplate, .scoreplate{
          background: var(--primary-7);
          color: var(--primary-7-text);
        }

        .image{
          background: var(--primary-8);
        }
      }    

      .secondary{
        background: var(--secondary-5);

        .nameplate, .scoreplate{
          background: var(--secondary-7);
          color: var(--secondary-7-text);
        }

        .image{
          background: var(--secondary-8);
        }
      } 

    
  }
</style>