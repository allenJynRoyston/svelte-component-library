<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Rating from '@components/FormComponents/Rating/Rating.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'Rating',
    importName: '@components/FormComponents/Rating/Rating.svelte',
    properties: `
    export let onChange = null
    export let onKeypress = null
    export let updateForm = null;    

    export let type = null;  
    export let placeholder = null
    export let value = 0
    export let key = null
    export let label = null;
    export let required = null;
    export let maxLength = 5;  
    export let slots = null 
    `   
  }

  $: livecode = `    
    const props = {
      type: 'success',
      label: 'Ratings',
      key: 'rating',      
      value: 2,                
      required: true,
      maxLength: 10,  
      slots: {
        selected: 'star-full',
        notSelected: 'star-empty'
      }
    }

    <Rating {...props} ${fullstr} /> 
     `
     
    const staticprops = {
      type: 'success',
      label: 'Ratings',
      key: 'rating',      
      value: 2,                
      required: true,
      maxLength: 10,  
      slots: {
        selected: 'star-full',
        notSelected: 'star-empty'
      }
    }

</script>


<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <Rating {...staticprops} {...props} {...selectprops} />
   </div>    
</LibrarySnippet>

