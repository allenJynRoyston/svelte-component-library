<script lang='ts'>
  import { openSidebar } from '../../../stores/store';
  import ThemeSwitch from '@components/ThemeSwitch/ThemeSwitch.svelte'
  import Search from '@components/Search/Search.svelte'
  import SVG from '@components/SVG/SVG.svelte'    

  export let showSidebarButton = false;
  export let showSearch = false;

</script>


<div class='search-notch'>
  <div class='theme-notch'>
    {#if showSidebarButton}
      <span class='tablet-landscape-and-below'>
          <SVG icon='grid-large' size={35} onClick={() => {$openSidebar = !$openSidebar}}/>        
      </span>
    {/if}
    <ThemeSwitch />
  </div>
  {#if showSearch}
    <Search/>
  {/if}
</div>

<style lang='scss'>
  @import "../../../scss/src/_media-queries.scss";


  .search-notch{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @include mobile-landscape-and-below {
      flex-wrap: wrap;
    }        
  }  

  .theme-notch{
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;    

    @include mobile-landscape-and-below {
      width: 100%;
    }   
  }
</style>
  