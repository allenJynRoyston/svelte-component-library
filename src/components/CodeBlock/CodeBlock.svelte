<script lang='ts'>
  import Accordion from '../Accordion/Accordion.svelte'

  export let title = null;
  export let open = false;

  export let snippet:string =  `
     const foo = 'foo';
     const bar = 'bar'
  `;

  export let lang:'typescript' | 'css' = 'typescript'

</script>


<Accordion fill {open}>
  <div slot='title'>
    <h3>{title}</h3>
  </div>


  <div slot='content' class={`root-component code-block`}>
    <code>
      <pre>
        {snippet}
      </pre>
    </code>    
  </div>
</Accordion>


<style lang='scss'>
  .code-block{
    background: var(--black-0);
    color: var(--primary-1);

    &.dark-theme{
      color: var(--success-1);
    }

  }
</style>