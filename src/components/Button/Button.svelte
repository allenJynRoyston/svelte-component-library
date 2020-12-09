<script>
  import { createEventDispatcher } from 'svelte';
  /**
   * Is this the principal call to action on the page?
   */
  export let primary = false;
  /**
   * How large should the button be?
   */
  export let size = 'medium';
  /**
   * Button contents
   */
  export let label = null;

  let mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  let style = null
  const dispatch = createEventDispatcher();

  let classes = ['storybook-button', 'something', `storybook-button--${size}`, mode].join(' ')

  /**
   * Optional click handler
   */
  function onClick(event) {
    dispatch('click', event);
  }
</script>

<template lang='pug'>
  button( 
    type="button" 
    class="{classes}" 
    on:click="{onClick}" 
    style="{style}"
    label="{label}") 
    slot Button
</template>

<style lang='scss'>
  .storybook-button {
    cursor: pointer;
    border: 0;
    border-radius: 3em;
    display: inline-block;    
  }
  .storybook-button--primary {
    color: white;
    background-color: #1ea7fd;
  }
  .storybook-button--secondary {
    color: #333;
    background-color: transparent;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
  }
  .storybook-button--small {
    font-size: 12px;
    padding: 10px 16px;
  }
  .storybook-button--medium {
    font-size: 14px;
    padding: 11px 20px;
  }
  .storybook-button--large {
    font-size: 16px;
    padding: 12px 24px;
  }
</style>