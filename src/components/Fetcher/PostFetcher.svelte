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
    const post = await findPostById(id) 
    // @ts-ignore
    // const portrait = await findImageById(user.imageId);
    onComplete({
      ...post    
    })
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS

  //---------------------------

  //--------------------------- FUNCTIONS

  //---------------------------

</script>
