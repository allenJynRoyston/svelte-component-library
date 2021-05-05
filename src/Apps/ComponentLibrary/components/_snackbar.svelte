<script lang='ts'>
  import {getContext} from 'svelte';
  import LibraryBlock from './__LibraryBlock.svelte'

  const addSnack:any =getContext('addSnack')
  
  const addDurationSnack = (type) => {
    addSnack({message: 'Hello World', duration: 4000, type})
  }

  const addStaticSnack = (type) => {
    addSnack({message: 'Hello World', type})
  }  

</script>

<h2>Snackbar</h2>
<hr>
<p>Note: Snackbar must be added at the root of your app.</p>

<div style='display: flex; flex-direction: column'>
  <button on:click={() => {addDurationSnack('success')}}>Success</button>
  <button on:click={() => {addDurationSnack('primary')}}>Primary</button>
  <button on:click={() => {addDurationSnack('warning')}}>Warning</button>
  <button on:click={() => {addDurationSnack('error')}}>Error</button>

  <button on:click={() => {addStaticSnack('success')}}>Success (static)</button>
  <button on:click={() => {addStaticSnack('primary')}}>Primary (static)</button>
  <button on:click={() => {addStaticSnack('warning')}}>Warning (static)</button>
  <button on:click={() => {addStaticSnack('error')}}>Error (static)</button>  
</div>

<style lang='scss' scoped>
  button{
    padding: 10px;
    margin-bottom: 10px;
  }
</style>
