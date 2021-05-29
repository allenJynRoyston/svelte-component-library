<script lang='ts'>  
  import {debounce} from '@js/utility'
  import {getContext, tick} from 'svelte';
  import {DeviceStore} from '@store/store'
  import SVG from '@components/SVG/SVG.svelte'
  import Input from '@components/FormComponents/Input/Input.svelte'
  import Button from '@components/Button/Button.svelte'

  export let debounceTime = 0;  

  export let hideSearchIcon = false;
  export let hideClear = false;
  export let hideSearchButton = false;  

  export let onUpdate = (val) => {
    console.log(val)
  }

  const {isMobile} = DeviceStore;
  let currentvalue = null;

  const onClear = async() => {
    currentvalue = null;
    render = false;
    await tick()
    render = true;    
  }

  const onGo = () => {
    onUpdate(currentvalue)
  }


  const colors:any = getContext('colors');
  const theme:string = getContext('theme')


  let render = true;
  let ele;

  $: onKeypress = debounce((val) => {
    currentvalue = val.length === 0 ? null : val
    onUpdate(val.length === 0 ? null : val)
  }, debounceTime)    

</script>

<div class={`search ${theme}-theme`} bind:this={ele}>

  {#if !hideSearchIcon}
    <Button nomargin exactfit size='small' applyTheme={theme === 'dark' ? 'black' : 'white'} onClick={onGo}>
      <SVG icon='search' size={10} fill={theme !== 'dark' ? colors.black[0].color : colors.white[0].color} />
    </Button>
  {/if}

  <Input noBottomMargin onKeypress={onKeypress}  />


  {#if !hideSearchButton || $isMobile}
    <Button nomargin exactfit size='small' applyTheme={theme === 'dark' ? 'black' : 'white'} onClick={onClear}>
      <SVG style='padding: 0 10px' icon='post' size={14} fill={theme !== 'dark' ? colors.black[0].color : colors.white[0].color} />
    </Button>
  {/if}  

  {#if !hideClear && !$isMobile}
    <Button nomargin exactfit size='small' applyTheme={theme === 'dark' ? 'black' : 'white'} onClick={onClear}>
      <SVG icon='cross' size={10} fill={theme !== 'dark' ? colors.black[0].color : colors.white[0].color} />
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

