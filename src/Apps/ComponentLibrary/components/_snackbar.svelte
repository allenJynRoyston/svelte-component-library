<script lang='ts'>
  import {getContext} from 'svelte';
  import LibraryBlock from './__LibraryBlock.svelte'
  import Link from '../../../components/Link/Link.svelte'  
  import Button from '../../../components/Button/Button.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

  const addSnack:any =getContext('addSnack')
  
  const addDurationSnack = (type) => {
    addSnack({message: 'I disappear after 4 seconds...', duration: 4000, type})
  }

  const addStaticSnack = (type) => {
    addSnack({message: 'I will only go away when you manually close me.', type})
  }  

  const withLink = (type) => {
    addSnack({component: Link, props: {text: "I'm a link component", href: '#library?component=snackbar&link=clicked'}, type})
  }

  const withButton = (type) => {
    addSnack({component: Button, props: {text: "I'm a button component - click me!", onClick: () => {
      alert('do something...')
    }}, type})
  }  

  const closeOnClick = (type) => {
    addSnack({closeOnClick: true, message: 'Close on click', type})
  }  


</script>

<h2>Snackbar</h2>
<hr>
<p>Note: Snackbar must be added at the root of your app.</p>

<LibraryBlock title='Timers:'>
  <button on:click={() => {addDurationSnack('primary')}}>Primary</button>
  <button on:click={() => {addDurationSnack('success')}}>Success</button>
  <button on:click={() => {addDurationSnack('warning')}}>Warning</button>
  <button on:click={() => {addDurationSnack('error')}}>Error</button>
</LibraryBlock>

<LibraryBlock title='No Timers:'>  
  <button on:click={() => {addStaticSnack('primary')}}>Primary (static)</button>
  <button on:click={() => {addStaticSnack('success')}}>Success (static)</button>  
  <button on:click={() => {addStaticSnack('warning')}}>Warning (static)</button>
  <button on:click={() => {addStaticSnack('error')}}>Error (static)</button>  
</LibraryBlock>

<LibraryBlock title='With Components:'> 
  <button on:click={() => {withLink('primary')}}>Primary</button>  
  <button on:click={() => {withLink('success')}}>Success</button>  
  <button on:click={() => {withLink('warning')}}>Warning</button>
  <button on:click={() => {withLink('error')}}>Error</button>
</LibraryBlock>

<LibraryBlock title='With Components (Buttons):'> 
  <button on:click={() => {withButton('primary')}}>Primary</button>
  <button on:click={() => {withButton('success')}}>Success</button>
  <button on:click={() => {withButton('warning')}}>Warning</button>
  <button on:click={() => {withButton('error')}}>Error</button>
</LibraryBlock>

<LibraryBlock title='Edge cases:'> 
  <button on:click={() => {closeOnClick('primary')}}>Close on click</button>
</LibraryBlock>


<CodeBlock title='Properties:' snippet={`
  export let snack = null;
  export let onComplete = () => {};
  export let onClick = () => {}
`} />

<CodeBlock open title='Example:' snippet={`
  // ADDED IN ROOT COMPONENT **************
    import SnackBar from '../../components/Snackbar/Snackbar.svelte'

    //---------------------------  SNACKBAR CODE
    let snack;
    setContext('addSnack', (newSnack) => {
      snack = newSnack
    })
    //---------------------------   

    <SnackBar {snack} />  
  // ******************************************


  // ADDED IN CHILDREN COMPONENT **************
  import {getContext} from 'svelte';

  //----------------------------------------  SNACKBAR
  const addSnack:any =getContext('addSnack')
  
  const newSnack = () => {
    addSnack({message: 'Success message', duration: 4000, type: 'success'})
  } 
  //----------------------------------------
  // ******************************************

`} />  



<style lang='scss' scoped>
  button{
    color: black;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>
