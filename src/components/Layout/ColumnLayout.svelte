<script lang='ts'>
  import Link from '../Link/Link.svelte'
  import SVG from '../SVG/SVG.svelte'
  import InnerContainer from '../InnerContainer/InnerContainer.svelte'

  export let links = []
  export let currentIndex = null;

  let collapse = false

  const toggleCollapse = (state = null) => {
    collapse = !!state || !collapse
  }

</script>

<div class={`root-component layout`} >

    <div class='layout-inner'>
      <div class='directory' class:collapse={collapse}>

        <button class='collapse-btn' class:collapse={collapse} on:click={() => {collapse = !collapse}}>
          <SVG icon={collapse ? 'arrow-left' : 'arrow-right'} size={16} />
        </button>

        <InnerContainer>
          <div class='directory-inner' class:collapse={collapse}>
            {#each links as { title, href }, i}
              <Link inherit type='bar' active={currentIndex === i} {href} onClick={() => {toggleCollapse(false)}} >
                {title} 
              </Link>        
            {/each}  
          </div>
        </InnerContainer>
      </div>

      <div class='content' class:collapse={collapse}>
        <slot>
          <p>Content</p>
        </slot>
      </div>
    </div>
</div>

<style lang="scss">
@import "../../scss/src/_media-queries.scss";

.layout {
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
    display: flex; 
    flex-direction: column;
    overflow-x: hidden;
    background: #999;
    color: var(--white-0);
    
    height: calc(100% - 20px);
    padding: 10px 50px 10px 10px; 

 
    @include desktop-and-up {     
      width: auto!important;
      text-align: left!important;
    }    

    &.collapse{
      width: 100vw;
      text-align: center;
    }
  }
  
    background: var(--white-0);;
    color: var(--black-1);

    &.dark-theme{
      background: var(--black-5);
      color: var(--white-0);
      .directory-inner{
        background: var(--black-3);
      }
    }  


  .collapse-btn{
    display: block;
    position: absolute;
    top: calc(80% - 120px);
    right: -40px;
    width: 40px;
    height: 60px;
    background: darkgrey;
    border-radius: 0 10px 10px 0;
    cursor: pointer;
    z-index: 1;
    border: none;
    outline: none;
    box-shadow: -2px 5px 5px rgba(0,0,0,0.2);

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
