<script lang='ts'>
  //--------------------------- IMPORTS  
  import { onMount, getContext } from 'svelte';

  //--------------------------- COMPONENT PROPS
  export let id = null;
  export let onComplete = (comment) => {}
  //---------------------------

  //--------------------------- VARS

  //--------------------------- APP CONTEXT   
  const FindCommentById = getContext('findCommentById')
  //---------------------------  

  
  //--------------------------- ONMOUNT
	onMount(async() => {
    // @ts-ignore
    const comment = await FindCommentById(id) || null

    if(!!comment){
      onComplete({
        ...comment    
      })
    }
    else{
      console.warn(`The comment with id: ${id} cannot be found.  Are you sure this is correct?`)
    }
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS

  //---------------------------

  //--------------------------- FUNCTIONS

  //---------------------------

</script>
