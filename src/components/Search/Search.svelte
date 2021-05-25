<script lang='ts'>  
  import {debounce} from '@js/utility'
  import {getContext, tick} from 'svelte';
  import {SiteStore, DeviceStore} from '@store/store'
  import SVG from '@components/SVG/SVG.svelte'
  import Input from '@components/FormComponents/Input/Input.svelte'
  import Button from '@components/Button/Button.svelte'

  export let debounceTime = 0;
  export let hideClear = false;
  export let searchBtn = false;
  export let onSearch = () => {}

  const {isMobile} = DeviceStore;


  const {searchValue} = SiteStore;
  let currentvalue = null;
  
  const onKeypress = debounce((val) => {
   $searchValue = val.length === 0 ? null : val
   onSearch($searchValue)
  }, debounceTime)  

  const onClear = async() => {
    $searchValue = null
    render = false;
    await tick()
    render = true;    
  }

  const onGo = () => {
    onSearch($searchValue)
  }


  const colors:any = getContext('colors');
  const isDark = getContext('theme') === 'dark'


  let render = true;
  let ele;


</script>

<div class={`root-component search`} bind:this={ele}>
  <Button nomargin exactfit size='small' type={isDark ? 'black' : 'white'} onClick={onGo}>
    <SVG icon='search' size={10} fill={!isDark ? colors.black[0].color : colors.white[0].color} />
  </Button>

  <Input noBottomMargin onKeypress={onKeypress} value={$searchValue || ''} />


  {#if searchBtn || $isMobile}
    <Button nomargin exactfit size='small' type={isDark ? 'black' : 'white'} onClick={onClear}>
      <SVG style='padding: 0 10px' icon='post' size={14} fill={!isDark ? colors.black[0].color : colors.white[0].color} />
    </Button>
  {/if}  

  {#if !hideClear && !$isMobile}
    <Button nomargin exactfit size='small' type={isDark ? 'black' : 'white'} onClick={onClear}>
      <SVG icon='cross' size={10} fill={!isDark ? colors.black[0].color : colors.white[0].color} />
    </Button>
  {/if}




</div>  

<style lang='scss'>
  .search{        
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;
    gap: 0px;

    .input-container{
      margin-bottom: 0
    }

  }      
</style>

