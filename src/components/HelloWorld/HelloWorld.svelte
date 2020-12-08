<script lang="ts">
  export let firstname: string | null = "First";
  export let lastname: string | null = "Last";
</script>

<style lang="scss" scoped>
  h1{
    color: orange
  }
</style>

<template lang='pug'>
  h1 Hello {firstname} {lastname}!
</template>
