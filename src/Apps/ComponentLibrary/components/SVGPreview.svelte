<script lang='ts'>
  import {getContext} from 'svelte';  
  import CopyToClipboard from "svelte-copy-to-clipboard";

  import SVG from '@base/SVG.svelte'
  import Button from '@base/Button.svelte'

  export let icon = null;
  export let title = null;
  export let index = null;

  const addSnack:any =getContext('addSnack')
  

  const onCopySuccess = () => {
    addSnack({message: 'Copied!', duration: 2000, type: 'success'})
  }

  const onCopyFail = () => {
    addSnack({message: 'Failed to copy to clipboard.', duration: 2000, type: 'danger'})
  }

</script>

<CopyToClipboard text={title} on:copy={onCopySuccess} on:fail={onCopyFail} let:copy>
  <button on:click={copy}>
    <div class='svg-preview'>
      <SVG {icon} size={18}/>
      <Button exactfit size='small' hollow applyTheme='black'>{title}</Button>  
    </div>
  </button>
</CopyToClipboard>    



<style lang='scss'>

  button{
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .svg-preview{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }

</style>