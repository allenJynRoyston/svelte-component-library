<script lang='ts'>
  import Highlight from "svelte-highlight";
  import Accordion from '../Accordion/Accordion.svelte'
  import agate from "svelte-highlight/src/styles/agate";
  import { typescript, css  } from "svelte-highlight/src/languages";

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
  {@html agate}
</svelte:head>

<Accordion fill {open}>
  <div slot='title'>
    <h3>{title}</h3>
  </div>


  <div slot='content' class='code-block'>
    <Highlight language={getLang()}  code={snippet} />
  </div>
</Accordion>

<style lang='scss'>
  .code-block{
    background: #333;
  }
</style>

