<script lant='ts'>  
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'
  import InnerContainer from '@components/InnerContainer/InnerContainer.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'InnerContainer',
    importName: '@components/InnerContainer/InnerContainer.svelte',
    properties: `
    export let height = '100vh'
    export let adjustPx = 0
    `,
    dropdowns: [
      {
        label: 'height',
        options: ['100vh', '75vh', '50vh'], 
        value: 0        
      }    
    ]    
  }

  $: livecode = `    
    <InnerContainer ${fullstr}>
      <strong>
        Automatically applies a scrollbar if wrapped in a container that is too small for the content.
        Can set the height manually if you want finer control over how much scroll is available.
      </strong>
      <LoremBlock />
      <LoremBlock />
      <LoremBlock />
    </InnerContainer>
     `


</script>

<LibrarySnippet {...snippet} {livecode}bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <InnerContainer {...props} {...selectprops}>
      <strong>
        Automatically applies a scrollbar if wrapped in a container that is too small for the content.
        Can set the height manually if you want finer control over how much scroll is available.
      </strong>
      <LoremBlock />
      <LoremBlock />
      <LoremBlock />
    </InnerContainer>
  </div>    
</LibrarySnippet>


