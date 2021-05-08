<script>
  import Link from '../Link/Link.svelte'
  import SVG from '../SVG/SVG.svelte'

  export let links = []
  export let currentIndex = null;

  let collapse = false

</script>

<div class='layout' >

    <div class='layout-inner'>
      <div class='directory' class:collapse={collapse}>

        <button class='collapse-btn' class:collapse={collapse} on:click={() => {collapse = !collapse}}>
          <SVG icon={collapse ? 'arrow-left' : 'arrow-right'} size={16} />
        </button>

        <div class='directory-inner' class:collapse={collapse}>
          {#each links as { title, href }, i}
            <Link active={currentIndex === i} {href} >
              {title}
            </Link>        
          {/each}  
        </div>
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
  overflow: auto;

  .layout-inner{
    display: flex;
  }

  .directory {
    width: 0;
    height: 100vh;
    display: flex;
    flex-direction: row; 
    background: grey;
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
    width: auto;
    height: calc(100% - 90px);
    display: flex; 
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px;
    color: white;
    
    @include desktop-and-up {
      padding: 10px 50px 10px 10px!important;   
      text-align: left!important;
    }    

    &.collapse{
      width: 100%;
      padding: 10px 0;   
      text-align: center;
    }
   
  }


  .collapse-btn{
    display: block;
    position: absolute;
    top: calc(50% - 120px);
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
      background: black;
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
