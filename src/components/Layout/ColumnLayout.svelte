<script lang='ts'>
  import {getContext} from 'svelte';
  import Link from '@components/Link/Link.svelte'
  import SVG from '@components/SVG/SVG.svelte'
  import InnerContainer from '@components/InnerContainer/InnerContainer.svelte'
  import Container from '@components/Container/Container.svelte'
  import { SiteStore } from '@store/store';

  export let links = []
  export let currentIndex = null;
  export let hidebtn:boolean = false;
  export let side = 'left'

  const colors:any = getContext('colors');
  const {openSidebar} = SiteStore;

  const toggleCollapse = (state = null) => {
     $openSidebar = !!state || !$openSidebar
  }

  $:opened = $openSidebar


</script>

<div class={`root-component column-layout`} >
    <div class='layout-inner'>
      <div class={`directory ${side}`} class:collapse={opened}>
        {#if !hidebtn || opened}
          <button class={`root-component collapse-btn`} class:collapse={opened} on:click={() => {toggleCollapse(false)}}>
            <SVG icon={opened ? 'arrow-left' : 'arrow-right'} fill={colors.white[0].color} size={16} />
          </button>
        {/if}

        <Container offset={2}>
          <div class='directory-inner' class:collapse={opened} >
            <InnerContainer>
              <div class='directory-links'>
                {#each links as { title, href }, i}
                  <Link inherit active={currentIndex === i} {href} onClick={() => {toggleCollapse(false)}} >
                    {title} 
                  </Link>        
                {/each}  
              </div>  
            </InnerContainer>
          </div>
        </Container>
      </div>

     
      <div class={`content ${side}`} class:collapse={opened}>
          <slot>
            <p>Content</p>
          </slot>
      </div>
   
    </div>
</div>

<style lang="scss">
  @import "../../scss/src/_media-queries.scss";

  .column-layout {
    width: 100%;
    display: block;  

    .layout-inner{
      display: flex;
    }

    .directory {
      width: 0;
      height: 100vh;
      display: flex;
      flex-direction: row;     
      position: relative;
      font-size: 12px;    

      &.right{
        order: 1;
      }      

      &.collapse{
        width: 100%;
      }

      @include desktop-and-up {
        font-size: 14px!important;
        width: auto!important;
        display: block;
      }
    }

    .directory-inner{
      overflow: hidden;
      width: 0;   
  
      @include desktop-and-up {     
        width: auto!important;
        height: 100%!important;
        text-align: left!important;
      }    

      &.collapse{
        width: 100vw;
        text-align: center;
      }
    }

    .directory-links{
      display: flex; 
      flex-direction: column;
      padding: 30px 50px 20px 10px;   
      font-size: 24px;     

      @include desktop-and-up {     
        font-size: 12px; 
      }     
    }


    .collapse-btn{
      display: block;
      position: absolute;
      top: 75px;
      right: -40px;
      width: 40px;
      height: 60px;    
      border-radius: 0 10px 10px 0;
      cursor: pointer;
      z-index: 1;
      border: none;
      outline: none;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);  
      background: var(--black-1);

      &.dark-theme{
        background: var(--white-1);
      }
      

      &.collapse{
        border-radius: 10px 0 0 10px;      
        right: 0px;
      }

      &:active{
        background: var(--black-0);
      }

      @include desktop-and-up {
        display: none;      
      }    
    }
    
    .content {      
      width: 100%;
      overflow: hidden;

      &.right{
        order: 0;
      }

      &.collapse{
        width: 0;
        padding: 0;
      }      

      @include desktop-and-up {
        width: 100%!important;
      }          
    }
  }
</style>
