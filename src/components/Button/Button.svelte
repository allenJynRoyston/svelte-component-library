<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();


  export let onClick = null
  export let disabled = false
  export let style = null
  export let role = 'button'
  export let dataTestid = null

  const onClickHandler = () => {    
    onClick && onClick()
  }


</script>

<button type='button' data-testid={dataTestid} {role} {disabled} {style} on:click={onClickHandler}>
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
    }
  }
</style>
