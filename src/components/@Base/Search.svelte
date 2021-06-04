<script lang='ts'>  
  import {debounce} from '@js/utility'
  import {onMount, getContext, tick} from 'svelte';
  import {DeviceStore} from '@store/store'
  import SVG from '@base/SVG.svelte'
  import Input from '@form/Input.svelte'
  import Button from '@base/Button.svelte'

  export let debounceTime = 0;  
  export let hideSearchIcon = false;
  export let hideClear = false;
  export let hideSearchButton = false;  
  export let value = null;
  export let placeholder = null;

  export let onUpdate = null;

  const {isMobile} = DeviceStore;
  
  $: currentvalue = value || null;

  onMount(() => {
    onUpdate && onUpdate(currentvalue)
  })

  const onClear = async() => {
    value = null;
    currentvalue = null;
    render = false;
    onUpdate && onUpdate(null)    
    await tick()
    render = true;      
  }

  const onGo = () => {
    onUpdate && onUpdate(currentvalue)
  }


  const colors:any = getContext('colors');
  const theme:string = getContext('theme')


  let render = true;
  let ele;

  $: onKeypress = debounce((val) => {
    currentvalue = val.length === 0 ? null : val
    onUpdate && onUpdate(val.length === 0 ? null : val)
  }, debounceTime)    

</script>

<div class={`search ${theme}-theme`} bind:this={ele}>

  {#if !hideSearchIcon}
    <Button nomargin exactfit size='small' applyTheme={theme === 'dark' ? 'black' : 'white'} onClick={onGo}>
      <SVG icon='search' size={10} fill={theme !== 'dark' ? colors.black[0].color : colors.white[0].color} />
    </Button>
  {/if}

  {#if render}
    <Input nomargin onKeypress={onKeypress} {placeholder} bind:value />
  {/if}


  {#if !hideSearchButton || $isMobile}
    <Button nomargin exactfit size='small' applyTheme={theme === 'dark' ? 'black' : 'white'} onClick={onClear}>
      <SVG style='padding: 0 10px' icon='post' size={14} fill={theme !== 'dark' ? colors.black[0].color : colors.white[0].color} />
    </Button>
  {/if}  

  {#if !hideClear && !$isMobile}
    <Button nomargin exactfit disabled={currentvalue === null || currentvalue?.length === 0} size='small' applyTheme={theme === 'dark' ? 'black' : 'white'} onClick={onClear}>
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

