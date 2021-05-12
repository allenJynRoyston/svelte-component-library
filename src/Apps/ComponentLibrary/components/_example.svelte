<script>
  import Button from '../../../components/Button/Button.svelte'
  import Accordion from '../../../components/Accordion/Accordion.svelte'

</script>


<div class={`example-block root-component`}>

  <h4>Button</h4>
  <Button >Test</Button>

  <h4>Accordion</h4>
  <Accordion />

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