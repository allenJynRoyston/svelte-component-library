<script>
  import Accordion from '../../../components/Accordion/Accordion'

  export let title = null;
  
</script>

<div class='library-block'>
  <Accordion fill open theme='light'>
    <div slot='title' class='title'>
      <h3>{title || 'Title'}</h3>
    </div>
    <div slot='content'>    
      <slot />
    </div>   
  </Accordion>
</div>

<style lang='scss'>
  .library-block{
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid grey;
  }
</style>