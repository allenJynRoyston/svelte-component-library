<script lang='ts'>
  import LibraryBlock from '../../ComponentLibrary/components/__LibraryBlock.svelte'
  import LocalStorageWatch from '../../../components-db/LocalStorageWatch.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

  import UserPortrait from '../../../components-db/UserPortrait/UserPortrait.svelte'
  
  

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

<LibraryBlock title="Live:">
  {#if loggedIn && loginData?._id}
    <UserPortrait userId={loginData._id} />
    <UserPortrait userId={loginData._id} rounded/>

  {:else}
    <p>Must be logged in first.</p>
  {/if}
</LibraryBlock>



<CodeBlock title='Properties:' snippet={`
  export let userId;
  export let rounded = false;
  export let style = null;
  export let currentEmotion = null;
  export let onClick = () => {}
`} />

<CodeBlock open title='Example:' snippet={`
    <UserPortrait userId={loginData._id} />
    <UserPortrait userId={loginData._id} rounded />
`} />  

  
  
