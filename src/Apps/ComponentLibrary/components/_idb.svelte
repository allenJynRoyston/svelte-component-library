<script lang='ts'>
  import IDB from '../../../components/Utility/IndexDBSetup.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import {createDB} from '../../../js/utility'

  const db = createDB({
    version: 1,
    name: 'example', 
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
  })  

</script>

<IDB {...db} />

<h2>IndexDB</h2>
<hr>
<LibraryBlock section >
  <p>Check application/database</p>
</LibraryBlock>