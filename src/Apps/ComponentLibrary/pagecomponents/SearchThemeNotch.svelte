<script lang='ts'>
  import ThemeSwitch from '@components/ThemeSwitch/ThemeSwitch.svelte'
  import Search from '@components/Search/Search.svelte'
  import {SiteStore} from '@store/store';

  export let showSearch = false;
  
  const {searchValue, openSidebar, openNotch} = SiteStore;
  
  const onUpdate = (val) => { 
    $searchValue = val        
    $openSidebar = val?.length > 0;
  }
</script>

{#if $openNotch}
  <div class='search-notch'>
    <div class='theme-notch'>
      <ThemeSwitch />
    </div>
    {#if showSearch}
      <Search onUpdate={onUpdate} debounceTime={10} hideSearchButton placeholder='Search for a component...'/>
    {/if}
  </div>
{/if}

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
  