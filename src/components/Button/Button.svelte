<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();


  export let onClick = null
  export let disabled = false

  const onClickHandler = () => {    
    onClick && onClick()
  }


</script>

<button disabled={disabled} type='button' on:click={onClickHandler}>
  <slot>Button</slot>
</button>


