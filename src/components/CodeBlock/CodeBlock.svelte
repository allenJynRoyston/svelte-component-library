<script lang='ts'>
  import {getContext} from 'svelte'

  import Accordion from '../Accordion/Accordion.svelte'

  export let title = null;
  export let open = false;
  export let nowrap = false;
  export let show = false;

  export let snippet:string =  `
     const foo = 'foo';
     const bar = 'bar'
  `;

  export let lang:'typescript' | 'css' = 'typescript'

  const theme:string = getContext('theme')

</script>

<div class='code-block-container' class:show={show} class:hide={!show}>
  {#if !nowrap}
    <Accordion full {open}>
      <div slot='title'>
        <h3>{title}</h3>
      </div>


      <div slot='content' class={`code-block ${theme}-theme`}>
        <code>
          <pre>
            {snippet}
          </pre>
        </code>    
      </div>
    </Accordion>
  {:else}
    <div class={`code-block ${theme}-theme`}>
      <code>
        <pre>
          {snippet}
        </pre>
      </code>    
    </div>  
  {/if}
</div>


<style lang='scss'>
  .code-block-container{
    &.show{
      opacity: 1;
      width: auto;
      height: auto;
    }

    &.hide{
      opacity: 0;
      width: 0;
      height: 0;
    }    
  }
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