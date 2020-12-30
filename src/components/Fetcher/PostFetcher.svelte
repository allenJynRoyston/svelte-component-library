<script lang='ts'>
  //--------------------------- IMPORTS  
  import { onMount, getContext } from 'svelte';

  //--------------------------- COMPONENT PROPS
  export let id = null;
  export let onComplete = (post) => {}
  //---------------------------

  //--------------------------- VARS

  //--------------------------- APP CONTEXT 
  const findUserById = getContext('findUserById')
  const findImageById  = getContext('findImageById')
  const findPostById = getContext('findPostById')
  //---------------------------  

  
  //--------------------------- ONMOUNT
	onMount(async() => {
    // @ts-ignore
    const post = await findPostById(id) || null

    if(!!post){
      onComplete({
        ...post    
      })
    }
    else{
      console.warn(`The post with id: ${id} cannot be found.  Are you sure this is correct?`)
    }
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS

  //---------------------------

  //--------------------------- FUNCTIONS

  //---------------------------

</script>
