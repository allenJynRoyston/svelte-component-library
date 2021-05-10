<script lang='ts'>
  //--------------------------- IMPORTS  
  import { onMount, getContext } from 'svelte';

  //--------------------------- COMPONENT PROPS
  export let query = null;
  export let onComplete = (user) => {}
  //---------------------------

  //--------------------------- VARS

  //--------------------------- APP CONTEXT 
  const findUserById:any = getContext('findUserById')
  const findImageById:any  = getContext('findImageById')
  //---------------------------  

  
  //--------------------------- ONMOUNT
	onMount(async() => {
    const user = await findUserById(query) || null
    
    if(!!user){
      const portrait = await findImageById(user.imageId);    
      onComplete({
        ...user,
        portrait      
      })
    }
    else{
      console.warn(`The user with query: ${query} cannot be found.  Are you sure this is correct?`)
    }
  }); 
  //---------------------------   

  //--------------------------- EVENT HANDLERS

  //---------------------------

  //--------------------------- FUNCTIONS

  //---------------------------

</script>
