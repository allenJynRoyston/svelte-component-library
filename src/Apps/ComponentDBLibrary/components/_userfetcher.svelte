<script lang='ts'>
  import LibraryBlock from '../../ComponentLibrary/components/LibraryBlock.svelte'
  import UserFetcher from '../../../components-db/Fetcher/UserFetcher.svelte'
  import LocalStorageWatch from '../../../components-db/LocalStorageWatch.svelte'
  import CodeBlock from '@base/CodeBlock.svelte'

  
  //-----------------------------------------  USER FETCHER
  let userData;
  const onComplete = (user) => {
    userData = user;
  }
  //-----------------------------------------

  //----------------------------------------- LOCAL STORAGE
  let loggedIn, loginData;
  const onFetch = ({success, data}) => {
    loggedIn = success;
    loginData = data;    
  }  
  //-----------------------------------------

</script>

<h2>UserFetcher</h2>
<hr>



<LocalStorageWatch key='login' {onFetch}/>

<LibraryBlock title="Default:">
  {#if loggedIn && loginData?._id}
    <UserFetcher {onComplete} query={loginData._id} />

    <p><strong>{JSON.stringify(userData, null, 4)}</strong></p>

  {:else}
    <p>Must be logged in first.</p>
  {/if}
</LibraryBlock>



<CodeBlock title='Properties:' snippet={`
  export let query = null;
  export let onComplete = (user) => {}
`} />

<CodeBlock open title='Example:' snippet={`
  //-----------------------------------------  USER FETCHER
  let userData;
  const onComplete = (user) => {
    userData = user;
  }
  //-----------------------------------------

  <UserFetcher {onComplete} query={loginData._id} />

  <p><strong>{JSON.stringify(userData, null, 4)}</strong></p>
`} />  

  
  
