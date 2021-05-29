<script lang='ts'>  
  import {getContext} from 'svelte';
  import { SiteStore } from '@store/store';
    
  import Link from '@components/Link/Link.svelte'
  import SVG from '@components/SVG/SVG.svelte'
  import InnerContainer from '@components/InnerContainer/InnerContainer.svelte'
  import Container from '@components/Container/Container.svelte'
  import Accordion from '@components/Accordion/Accordion.svelte'

  export let links = []
  export let currentIndex = null;
  export let hidebtn:boolean = false;
  export let disableSearch = false;
  export let watchParam = null
  export let ignoreForExample = false

  export let activeTheme = 'primary'
  export let side = 'left'  

  const colors:any = getContext('colors');
  const theme:string = getContext('theme');

  const {openSidebar, urlParams, searchValue} = SiteStore;

  const toggleCollapse = (state = null) => {
     $openSidebar = !!state || !$openSidebar
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const partialMatch = (str1, str2) => {
    return new RegExp(str1).test(str2)
  }  

  let linkList = {};

  $:opened = $openSidebar

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

  
  $: isOpened = (key, index) => $urlParams[watchParam] ? ($urlParams[watchParam] || null) === key.toLowerCase() : index === 0

  $: {
    buildList()
  }


</script>

<div class={`column-layout ${theme}-theme`} >
    <div class='layout-inner'>
      <div class={`directory ${side}`} class:collapse={opened}>
        {#if !hidebtn || opened}
          <button class={`collapse-btn ${theme}-theme`} class:collapse={opened} on:click={() => {toggleCollapse(false)}}>
            <SVG icon={opened ? 'arrow-left' : 'arrow-right'} fill={colors.white[0].color} size={16} />
          </button>
        {/if}

        <Container offset={5}>
          <div class='directory-inner' class:collapse={opened} >
            <InnerContainer accountForTopPos height={'100%'}>
              <div class='directory-links-container'>
                {#each Object.entries(linkList) as [key, pairs], index}
                  <Accordion listform full open={isOpened(key, index)}>
                    <span class='directory-key' slot='title'>
                      {capitalize(key)} 
                    </span>

                    
                    <ul class='directory-links' slot='content'>
                      {#each pairs as {href, title}, index}
                        {#if $searchValue === null || partialMatch($searchValue?.toLowerCase(), title?.toLowerCase())}
                          <Link classes='font-one' type={activeTheme} {href} active={!!$urlParams?.component && !ignoreForExample ? $urlParams?.component === title : index === 0} onClick={() => {toggleCollapse(false)}} >
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
        min-width: 225px;
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
