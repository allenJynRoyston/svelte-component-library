<script lang='ts'>
  import LibraryBlock from '../../ComponentLibrary/components/__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

  import Login from '../../../components-db/Login.svelte'
  import LocalStorageWatch from '../../../components-db/LocalStorageWatch.svelte'

  let loggedIn, loginData;

  const login = () => {
    window.localStorage.setItem('login', JSON.stringify({firstname: 'John', lastname: 'Smith', _id: 0, age: 35}))
    location.reload()
  }

  const logout = () => {
    window.localStorage.removeItem('login')
    location.reload()
  }  
  
  const onFetch = ({success, data}) => {
    loggedIn = success;
    loginData = data;    
  }
</script>

<h2>Login</h2>
<hr>

<LocalStorageWatch key='login' {onFetch}/>

<LibraryBlock title="Live:">
  <button  disabled={!loggedIn} on:click={logout} > Log Out </button>
  <button  disabled={loggedIn} on:click={login}> Log In </button>

  <Login />
</LibraryBlock>

<CodeBlock title='Properties:' snippet={`
`} />

<CodeBlock open title='Example:' snippet={`

`} />  




