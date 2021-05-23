<script>
  import Accordion from '../../../components/Accordion/Accordion'
  export let title = null;
</script>

<div class='library-block'>
  <Accordion fill open>
    <div slot='title' class='title'>
      <h3>{title || 'Title'}</h3>
    </div>
    <div slot='content'>    
      <slot />
    </div>   
  </Accordion>
</div>
