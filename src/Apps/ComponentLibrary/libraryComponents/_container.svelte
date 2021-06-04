<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Container from '@layout/Container.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'Container',
    importName: '@layout/Container.svelte',
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
    <Container ${propstr}${selectstr}${inputstr}>
      <div style='padding: 20px'>
        <h1>I am a header.</h1>
        <p>
          This container will automatically wrap the contents and apply the correct theme to the body content.
        </p>    
      <div style='padding: 20px'>
    </Container>  
     `  
</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Container  {...props} {...selectprops}
{...inputprops}>
      <div style='padding: 20px'>
        <h1>I am a header.</h1>
        <p>
          This container will automatically wrap the contents and apply the correct theme to the body content.
        </p>    
      <div style='padding: 20px'>
    </Container> 
   </div>    
</LibrarySnippet>
