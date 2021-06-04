<script lang='ts'>  
  import {getContext} from 'svelte';
  import { SiteStore, DeviceStore } from '@store/store';  

  import Link from '@base/Link.svelte'
  import InnerContainer from '@base/InnerContainer.svelte'
  import Container from '@layout/Container.svelte'
  import Accordion from '@base/Accordion.svelte'

  export let links = []    
  export let watchParam = null
  export let ignoreForExample = false

  export let activeTheme = 'primary'
  export let side = 'left'  

  const colors:any = getContext('colors');
  const theme:string = getContext('theme');

  const {openSidebar, urlParams, searchValue} = SiteStore;
  const {isTabletAndBelow} = DeviceStore;
  

  const toggleCollapse = (state = null) => {
     $openSidebar = !!state || !$openSidebar
  }

  let removeWidth = false;
	SiteStore.openSidebar.subscribe(async(value) => {
    if(!value){
      setTimeout(() => {
        removeWidth = true;
      }, 300)
    }
    else{
      removeWidth = false
    }
	});    

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const partialMatch = (str1, str2) => {
    return new RegExp(str1).test(str2)
  }  

  let linkList = {};

  const buildList = () => {
    let _list = {};
    links.forEach(x => {
      const {section, title} = x;         
      _list[section] = []      
    })

    for (const key in _list) {
      _list[key] = links.filter(x => x.section === key)
    }
    
    linkList = _list;
  }

  
  $: accordionIsOpened = (key, index) => $urlParams[watchParam] ? ($urlParams[watchParam] || null) === key.toLowerCase() : index === 0

  $: {
    buildList()
  }


</script>

<div class={`column-layout ${theme}-theme`} >
    <div class='layout-inner'>
      <div class={`directory ${side}`} class:collapse={!$openSidebar} class:removeWidth={removeWidth}>
        <Container offset={5}>
          <div class='directory-inner' >
            <InnerContainer accountForTopPos height={'100%'}>
              <div class='directory-links-container'>
                {#each Object.entries(linkList) as [key, pairs], index}
                  <Accordion listform full nopadding open={ $searchValue?.length > 0 || accordionIsOpened(key, index)}>
                    <span class='directory-key' slot='title'>
                      {capitalize(key)} 
                    </span>
 
                    <ul class='directory-links' slot='content'>
                      {#each pairs as {href, title}, index}
                        {#if $searchValue === null || partialMatch($searchValue?.toLowerCase(), title?.toLowerCase())}
                          <Link classes='font-one' type={activeTheme} {href} applyHover applyActive active={!!$urlParams?.component && !ignoreForExample ? $urlParams?.component === title : index === 0} >
                            {capitalize(title)} 
                          </Link>
                        {/if}        
                      {/each}    
                    </ul>
                  </Accordion>
                {/each}

              </div>  
            </InnerContainer>
          </div>
        </Container>
      </div>

     
      <div class={`content ${side}`}>
        {#if $isTabletAndBelow && $openSidebar}
          <div class='backdrop' on:click={() => {$openSidebar = false}} />
        {/if}

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
    position: relative;

    .layout-inner{
      display: flex;
    }

    .directory {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: row;     
      font-size: 12px;    
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: auto;
      overflow: hidden;
      transform: translateX(0);
      transition: 0.3s;

      &.removeWidth{
        width: 0!important;
      }

      &.right{
        order: 1;
      }      

      &.collapse{
        transform: translateX(-100%);
      }


      @include desktop-and-up {
        position: relative;
        top: 0;
        left: 0;
        width: 350px;
        font-size: 14px!important;
        display: block;
      }
    }

    .directory-inner{
      overflow: hidden;         
    }

    .directory-links-container{
      display: flex; 
      flex-direction: column;
      padding: 10px;
      
      .directory-key{
        font-size: 16px;
      }

    }

    .directory-links{
      display: flex; 
      flex-direction: column;
      padding: 10px;
      font-size: 18px;     

      @include desktop-and-up {     
        padding: 0 10px;
        font-size: 14px;
      }         
    }
    
    .content {      
      position: relative;
      width: 100%;
      overflow: hidden;

      .backdrop{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.9;
        z-index: 1;
        background: var(--black-0);
        cursor: pointer;
      }

      &.right{
        order: 0;
      }
  
      @include desktop-and-up {
        width: 100%!important;
      }          
    }
  }
</style>
