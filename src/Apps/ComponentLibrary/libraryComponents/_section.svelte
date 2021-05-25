<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'
  import Section from '@components/Section/Section.svelte'  

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'Section',
    importName: '@components/Section/Section.svelte',
    properties: `
    export let outline = false;
    export let className = null;
    export let style = null;
    export let paddingTop = false;
    `,
    props: {
      outline: false,
      paddingTop: false
    }
  }

  $: livecode = `    
    <Section ${fullstr}>
      <h1>I render content with a consistent padding that shrinks on mobile to fit better.</h1>
      <LoremBlock />
    </Section>        
     `

</script>

<LibrarySnippet {...snippet} {livecode}  bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <Section {...props} {...selectprops}>
      <h1>I render content with a consistent padding that shrinks on mobile to fit better.</h1>
      <LoremBlock />
    </Section>    
   </div>    
</LibrarySnippet>
