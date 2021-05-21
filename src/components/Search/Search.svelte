<script lang='ts'>  
  import {debounce} from '@js/utility'
  import {getContext, tick} from 'svelte';
  import SVG from '@components/SVG/SVG.svelte'
  import Input from '@components/FormComponents/Input/Input.svelte'
  import Button from '@components/Button/Button.svelte'

  import {SiteStore} from '@store/store';
  
  export let debounceTime = 0;
  export let hideClear = false;
  export let onSearch = () => {}

  const {searchValue} = SiteStore;
  
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


  const colors:any = getContext('colors');
  const isDark = getContext('theme') === 'dark'


  let render = true;
  let ele;


</script>

<div class={`root-component search`} bind:this={ele}>
  <SVG style='margin-right: 10px' icon='search' fill={!isDark ? colors.black[0].color : colors.white[0].color} />
  <Input noBottomMargin onKeypress={onKeypress} value={$searchValue || ''} />
  {#if !hideClear}
    <Button exactfit size='small' type={isDark ? 'black' : 'white'} onClick={onClear}>
      <SVG icon='bin' fill={!isDark ? colors.black[0].color : colors.white[0].color} />
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

