<script lang='ts'>
  import LocalStorageWatch from './LocalStorageWatch.svelte'

  let loggedIn = null;
  let loginDetails = null;

  const onFetch = ({success, data}) => {
    loggedIn = success;
    loginDetails = data;
  }

</script>

<LocalStorageWatch key='login' {onFetch}/>

{#if loggedIn && loginDetails}
  Logged data: <strong>{JSON.stringify(loginDetails, null, 4)}</strong>
{:else}
  Not logged in
{/if}