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
  <div style='display: flex; gap: 10px'>
    <Button type='primary' onClick={() => {addDurationSnack('primary')}}>Primary</Button>
    <Button type='success' onClick={() => {addDurationSnack('success')}}>Success</Button>
    <Button type='warning' onClick={() => {addDurationSnack('warning')}}>Warning</Button>
    <Button type='danger' onClick={() => {addDurationSnack('error')}}>Error</Button>
  </div>
</LibraryBlock>

<LibraryBlock title='No Timers:'>  
  <div style='display: flex; gap: 10px'>
    <Button type='primary' onClick={() => {addStaticSnack('primary')}}>Primary</Button>
    <Button type='success' onClick={() => {addStaticSnack('success')}}>Success</Button>
    <Button type='warning' onClick={() => {addStaticSnack('warning')}}>Warning</Button>
    <Button type='danger' onClick={() => {addStaticSnack('error')}}>Error</Button>
  </div>
</LibraryBlock>

<LibraryBlock title='With Components:'> 
  <div style='display: flex; gap: 10px'>
    <Button type='primary' onClick={() => {withLink('primary')}}>Primary</Button>
    <Button type='success' onClick={() => {withLink('success')}}>Success</Button>
    <Button type='warning' onClick={() => {withLink('warning')}}>Warning</Button>
    <Button type='danger' onClick={() => {withLink('error')}}>Error</Button>
  </div>
</LibraryBlock>

<LibraryBlock title='With Components (Buttons):'> 
  <div style='display: flex; gap: 10px'>
    <Button type='primary' onClick={() => {withButton('primary')}}>Primary</Button>
    <Button type='success' onClick={() => {withButton('success')}}>Success</Button>
    <Button type='warning' onClick={() => {withButton('warning')}}>Warning</Button>
    <Button type='danger' onClick={() => {withButton('error')}}>Error</Button>
  </div>
</LibraryBlock>

<LibraryBlock title='Close on click'> 
  <div style='display: flex; gap: 10px'>
    <Button type='primary' onClick={() => {closeOnClick('primary')}}>Primary</Button>
    <Button type='success' onClick={() => {closeOnClick('success')}}>Success</Button>
    <Button type='warning' onClick={() => {closeOnClick('warning')}}>Warning</Button>
    <Button type='danger' onClick={() => {closeOnClick('error')}}>Error</Button>
  </div>
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
