<script lang='ts'>
  import Accordion from '../Accordion/Accordion.svelte'

  export let title = null;
  export let open = false;
  export let nowrap = false;

  export let snippet:string =  `
     const foo = 'foo';
     const bar = 'bar'
  `;

  export let lang:'typescript' | 'css' = 'typescript'

</script>

{#if !nowrap}
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
{:else}
  <div class={`root-component code-block`}>
    <code>
      <pre>
        {snippet}
      </pre>
    </code>    
  </div>  
{/if}



<style lang='scss'>
  .code-block{
    overflow-x: auto;
    overflow-y: hidden;
    background: var(--black-0);
    color: var(--primary-1);
    margin: 5px 0;

    &.dark-theme{
      color: var(--success-1);
    }

  }
</style>