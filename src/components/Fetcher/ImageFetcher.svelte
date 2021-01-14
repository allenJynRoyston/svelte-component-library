<script lang='ts'>
  //--------------------------- IMPORTS  
  import { onMount, getContext } from 'svelte';

  //--------------------------- COMPONENT PROPS
  export let id = null;
  export let onComplete = (image) => {}
  //---------------------------

  //--------------------------- VARS

  //--------------------------- APP CONTEXT 
  const findImageById  = getContext('findImageById')
  //---------------------------  

  
  //--------------------------- ONMOUNT
	onMount(async() => {
    // @ts-ignore
    const image = await findImageById(id) || null

    if(!!image){
      onComplete({
        ...image    
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
