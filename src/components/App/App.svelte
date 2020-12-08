<script lang='ts'>
  import { HelloWorld, Button, SVInput } from '../index'
  export let name:string = 'World!'
</script>

<style lang='scss' scoped>
  .app-container{
    padding: 10px;
    border: 1px solid black
  }

  .app-header{
    color: pink;    
  }

  a{
    color: purple;
    font-size: 50px;
  }
</style>

<template lang='pug'>
  .app-container
    header.app-header
      Button
      SVInput
      h1 Hello {name}
      a.App-link(href='https://svelte.dev' target='_blank' rel='noopener noreferrer')
        | Learn Svelte
</template>