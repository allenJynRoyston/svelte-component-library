<script>
  import Button from '@components/Button/Button.svelte'
  import Accordion from '@components/Accordion/Accordion.svelte'
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte';

</script>


<div class={`example-block root-component`}>

  <LoremBlock />
  <LoremBlock />
  <LoremBlock />
  <LoremBlock />

</div>

<style lang='scss' scoped>
  .example-block{
    padding: 20px;
    background:var(--white-1);
    color: var(--white-1-text);

    &.dark-theme{
      background: var(--black-2);
      color: var(--black-2-text);
    }

    h4{
      margin-top: 20px;
    }
  }
</style>