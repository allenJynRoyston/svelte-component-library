<script lang='ts'>
  //--------------------------- IMPORTS  
  import {getContext, onMount} from 'svelte';
  import SVG from '../SVG/SVG.svelte'
  import Input from '../FormComponents/Input/Input.svelte'
  //---------------------------

  const colors:any = getContext('colors');
  let isDark = false;
  let ele;

  onMount(async() => {
    setTimeout(() => {
      isDark = ele?.className.includes('dark-theme')
      console.log(isDark)
    }, 100) 
  })  

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

