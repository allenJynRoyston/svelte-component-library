<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();


  export let onClick = null
  export let disabled = false
  export let style = null

  const onClickHandler = () => {    
    onClick && onClick()
  }


</script>

<button type='button' disabled={disabled} on:click={onClickHandler} {style}>
  <slot>Button</slot>
</button>


<style lang='scss' scoped>
  button{
    outline: none;
    border: none;
    height: 100%;
    cursor: pointer;
    background: lightgrey;

    &:active{
      background: darkgrey;
      color: white;
    }
  }
</style>
