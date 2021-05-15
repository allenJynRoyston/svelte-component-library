<script lang='ts'>
  //--------------------------- IMPORTS  
  import {getContext} from 'svelte';
  import SVG from '../SVG/SVG.svelte'
  import Input from '../FormComponents/Input/Input.svelte'
  //---------------------------

  const colors:any = getContext('colors');
  const isDark = getContext('theme') === 'dark'
  let ele;


</script>

<div class={`root-component search`} bind:this={ele}>
  <SVG icon='search' fill={!isDark ? colors.black[0].color : colors.white[0].color} />
  <Input noBottomMargin />
</div>  

<style lang='scss'>
  .search{        
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;
    gap: 10px;

    .input-container{
      margin-bottom: 0
    }

  }      
</style>

