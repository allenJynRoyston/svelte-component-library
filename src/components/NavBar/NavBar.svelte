<script lang='ts'>
  import Link from "../Link/Link.svelte";

  export let links = []

</script>

<div class={`root-component nav-bar`}>
  {#each links as {title, active = false, href = '/', icon}, index}
    <Link inherit {href} {active} type='underline'>
      {title}
    </Link>  
  {/each}
</div>

<style lang='scss'>
  .nav-bar{
    display: flex;
    gap: 10px;
    font-weight: 700;
    color: white;

    &.dark-theme{
      color: #333;
    }
  }
</style>