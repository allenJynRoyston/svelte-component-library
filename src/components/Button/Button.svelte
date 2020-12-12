<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();


  export let onClick = null
  export let disabled = false

  const onClickHandler = () => {    
    onClick && onClick()
  }


</script>

<button type='button' disabled={disabled} on:click={onClickHandler}>
  <slot>Button</slot>
</button>


