<script lang='ts'>
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import IDB from '../../../components/Utility/IndexDBSetup.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import {createDB} from '../../../js/utility'

  import {setContext} from 'svelte'
  import {IndexDBStore} from '../../../js/index'

  const db = new IndexDBStore('example', 1); 
  // set context so it can be referenced in children components
  setContext('indexdb', db)

  let allUsers = [];
  let allPlaces = [];

  let query;

  const idb = createDB({
    indexdb: db,
    clearOnRefresh: true,
    tables: ['user', 'places'], 
    data: {
      user: [
        {name: 'Person 1', age: 18},
        {name: 'Person 2', age: 25},
        {name: 'Person 3', age: 32},
      ],
      places: [
        {name: 'Area 1', weather: 'warm'},
        {name: 'Area 2', weather: 'cold'},
        {name: 'Area 3', weather: 'chilly'},
      ]  
    }, 
    queryBy: 'name'
  })  

  const onReady = async() => {
    allUsers = await db.getAll('user');
    allPlaces = await db.getAll('places');

    query = await db.get('user', 'Person 2')
    console.log(query)
  }

</script>

<IDB {...idb} {onReady} />

<h2>IndexDB</h2>
<hr>

<LibraryBlock title="Live:">
  <p>Check application/database</p>
  <IDB {...idb} {onReady} />
</LibraryBlock>

<CodeBlock title='Properties:' snippet={`
  export let indexdb:any;
  export let data:any = []
  export let tables:string[] = []
  export let clearOnRefresh = false;
  export let queryBy:string[] | string = "_id"
  export let onReady = () => {}
  export let onUpdate = () => {}
`} />

<CodeBlock open title='Example:' snippet={`
  import {setContext} from 'svelte'
  import {IndexDBStore} from '../js/index'
  import IDB from '../IndexDBSetup.svelte'

  const db = new IndexDBStore('example', 1); 
  
  //**************
  // setContext in root component, getContext in child components
  setContext('indexdb', db) 
  const db = getContext('indexdb') 
  //**************


  let allUsers = [];
  let allPlaces = [];

  let query;

  const idb = createDB({
    indexdb: db,
    clearOnRefresh: true,
    tables: ['user', 'places'], 
    data: {
      user: [
        {name: 'Person 1', age: 18},
        {name: 'Person 2', age: 25},
        {name: 'Person 3', age: 32},
      ],
      places: [
        {name: 'Area 1', weather: 'warm'},
        {name: 'Area 2', weather: 'cold'},
        {name: 'Area 3', weather: 'chilly'},
      ]  
    }, 
    queryBy: 'name'
  })  

  const onReady = async() => {
    allUsers = await db.getAll('user');
    allPlaces = await db.getAll('places');

    query = await db.get('user', 'Person 2')
  }

  <IDB {...idb} {onReady} />
`} />  

<LibraryBlock title="Output:">
  <h5>Users:</h5>
  {JSON.stringify(allUsers, null, 4)}     
  <hr> 
  
  <h5>Places:</h5>
  {JSON.stringify(allPlaces, null, 4)}     
  <hr>   
  
  <h5>Query:</h5>
  {JSON.stringify(query, null, 4)}     
</LibraryBlock>

