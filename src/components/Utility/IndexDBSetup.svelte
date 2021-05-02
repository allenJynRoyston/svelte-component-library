<script lang='ts'>
  import {onMount, setContext} from 'svelte';
  import {IndexDBStore} from '../../js/index'

  export let version = 1
  export let name = 'database'
  export let data:any = []
  export let tables:string[] = []
  export let clearOnRefresh = false;

  const indexdb = new IndexDBStore(name, version);             
  setContext('indexdb', indexdb)    

  export let onReady = () => {}
  export let onUpdate = () => {}

  let isReady = false;
  
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
      await indexdb.createTable(tables);
      resolve()
    })
  }
  //---------------------------  

  //---------------------------  
  const setupData = () => {   
    const keys = !!data ? Object.keys(data) : []

    // delete previous database entries
    if(clearOnRefresh){
      keys.forEach(key => {
        indexdb.clear(key)
      })
    }

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