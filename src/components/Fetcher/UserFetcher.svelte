<script lang='ts'>
  //--------------------------- IMPORTS  
  import { onMount, getContext } from 'svelte';

  //--------------------------- COMPONENT PROPS
  export let id = null;
  export let onComplete = (user) => {}
  //---------------------------

  //--------------------------- VARS

  //--------------------------- APP CONTEXT 
  const findUserById = getContext('findUserById')
  const findImageById  = getContext('findImageById')
  //---------------------------  

  
  //--------------------------- ONMOUNT
	onMount(async() => {
    // @ts-ignore
    const user = await findUserById(id) || null
    
    if(!!user){
      // @ts-ignore    
      const portrait = await findImageById(user.imageId);    
      onComplete({
        ...user,
        portrait      
      })
    }
    else{
      console.warn(`The user with id: ${id} cannot be found.  Are you sure this is correct?`)
    }
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS

  //---------------------------

  //--------------------------- FUNCTIONS

  //---------------------------

</script>
