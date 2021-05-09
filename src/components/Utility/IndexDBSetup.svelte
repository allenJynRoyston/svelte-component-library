<script lang='ts'>
  import {onMount} from 'svelte';
  
  export let indexdb:any;
  export let data:any = []
  export let tables:string[] = []
  export let clearOnRefresh = false;
  export let queryBy:string[] | string = "_id"

  export let onReady = () => {}
  export let onUpdate = () => {}

  let isReady = false;

  const keys = !!data ? Object.keys(data) : []

  //--------------------------- ONMOUNT
  onMount(async() => {     
    // setup required indexDB stuff   
    await setupIndexDB();  

    // setup with data
    await setupData();    

    // set ready flag
    isReady = true;

    // return callback
    onReady()
  })
  //---------------------------
  
  //--------------------------- 
  const setupIndexDB = () => {  
    return new Promise<void>(async(resolve) => {
      await indexdb.createTable(tables, queryBy);
      resolve()
    })
  }
  //---------------------------  


  //---------------------------  
  const setupData = () => {   

    // delete previous database entries
    keys.forEach(key => {
      if(clearOnRefresh){
        indexdb.clear(key)
      }
    })

    return new Promise<void>(async(resolved) => {
      let promises = [];

      keys.forEach(key => {
        data[key].forEach(props => {        
          promises.push(new Promise( async(resolve) => {
            // @ts-ignore
            await indexdb.add(key, {
              ...props,        
              metadata: {
                updatedOn: new Date()
              }      
            }, true)     
            resolve(null)
          }))   
        })
      })
      
      //--------------------------------------------
      Promise.all(promises).then(async() => {  
        // let count = await indexdb.count('products')        
        resolved()                    
      })      

    })
  }
  //---------------------------  

  //---------------------------
  const updateDatabase = async() => {
    await setupData();  
    onUpdate()
  }
  //---------------------------

  $: data && isReady && updateDatabase();


</script>