<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import LoremBlock from '@base/LoremBlock.svelte'
  import Section from '@layout/Section.svelte'  

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'Section',
    importName: '@layout/Section.svelte',
    props: {
      outline: false,
      nomargin: false
    }
  }

  $: livecode = `    
    <Section ${propstr}${selectstr}${inputstr}>
      <h1>I render content with a consistent padding that shrinks on mobile to fit better.</h1>
      <LoremBlock />
    </Section>        
     `

</script>

<LibrarySnippet {...snippet} {livecode}  bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Section {...props} {...selectprops}
{...inputprops}>
      <h1>I render content with a consistent padding that shrinks on mobile to fit better.</h1>
      <LoremBlock />
    </Section>    
   </div>    
</LibrarySnippet>
