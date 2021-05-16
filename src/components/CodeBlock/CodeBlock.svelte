<script lang='ts'>
  // import { Highlight } from "svelte-highlight";
  // import { typescript, css  } from "svelte-highlight/src/languages";
  import Accordion from '@components/Accordion/Accordion.svelte'  

  export let title = null;
  export let open = false;

  export let snippet:string =  `
     const foo = 'foo';
     const bar = 'bar'
  `;

  export let lang:'typescript' | 'css' = 'typescript'

  $: getLang = () => {
    switch(lang){
      case 'typescript':
        return typescript
      case 'css':
       return css
    }
  }

</script>


<svelte:head>
  <!-- {@html agate} -->
</svelte:head>

<Accordion fill {open}>
  <div slot='title'>
    <h3>{title}</h3>
  </div>


  <div slot='content' class='code-block'>
    <!-- <Highlight language={getLang()}  code={snippet} /> -->
  </div>
</Accordion>


<style lang='scss'>
  :global(.hljs){        
    padding-right: 50px;
    overflow-x: auto
  }
</style>