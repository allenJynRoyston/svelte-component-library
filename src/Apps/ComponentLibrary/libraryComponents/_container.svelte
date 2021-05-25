<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Container from '@components/Container/Container.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'Container',
    importName: '@components/Container/Container.svelte',
    properties: `
    export let offset = 0;
    `,
    props: {

    }, 
    dropdowns: [
      {
        label: 'offset',
        options: [null, 1, 2, 3, 4, 5, 6], 
        value: 1        
      }  
    ]
  }  

  $: livecode = `    
    <Container ${fullstr}>
      <div style='padding: 20px'>
        <h1>I am a header.</h1>
        <p>
          This container will automatically wrap the contents and apply the correct theme to the body content.
        </p>    
      <div style='padding: 20px'>
    </Container>  
     `  
</script>


<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <Container  {...props} {...selectprops}>
      <div style='padding: 20px'>
        <h1>I am a header.</h1>
        <p>
          This container will automatically wrap the contents and apply the correct theme to the body content.
        </p>    
      <div style='padding: 20px'>
    </Container> 
   </div>    
</LibrarySnippet>
