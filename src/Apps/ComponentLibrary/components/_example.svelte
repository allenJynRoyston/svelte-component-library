<script>
  import Button from '../../../components/Button/Button.svelte'
  import Accordion from '../../../components/Accordion/Accordion.svelte'
  import LoremBlock from '../../../components/LoremBlock/LoremBlock.svelte';

</script>


<div class={`example-block root-component`}>

  <LoremBlock />

</div>

<style lang='scss' scoped>
  .example-block{
    padding: 20px;
    background:white;
    color: #333;

    &.dark-theme{
      background: #333;
      color: white;
    }

    h4{
      margin-top: 20px;
    }
  }
</style>