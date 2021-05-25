<script lang='ts'>
  import {getContext} from 'svelte'
  import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Button from '@components/Button/Button.svelte'
  import Link from '@components/Link/Link.svelte'    

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'Snackbar',
    importName: '@components/Snackbar/Snackbar.svelte',
    properties: `

    `,
    props: {
      closeOnClick: false,
    }, 
    dropdowns: [
      {
        label: 'type',
        options: ['primary','success', 'warning', 'danger'], 
        value: 0        
      },
      {
        label: 'duration',
        options: [null, 2000, 4000, 6000], 
        value: 2        
      }      
    ]
  }

  $: livecode = `    
    const addSnack:any =getContext('addSnack')
    
    const snacktime = () => {    
      addSnack({
        message: 'I am a snackbar!', 
        type: 'primary', 
        duration: 4000, 
        closeOnClick: true,
      })
    }

    <Button exactfit type='primary' onClick={() => {snacktime()}}>Add Snack</Button>
     `  

  const addSnack:any =getContext('addSnack')
  
  const snacktime = () => {    
    addSnack({
      message: 'I am a snackbar!', 
      ...props,
        ...selectprops,
    })
  }


  const withLink = () => {
    addSnack({
      component: Link, 
      props: {
        text: "I'm a link component", 
        href: '#library?component=snackbar&link=clicked', 
        type: props.type, 
        active: true}, 
        ...props,
        ...selectprops,        
      })
  }

  const withButton = () => {
    addSnack({
      component: Button, 
      props: {
        text: "I'm a button component - click me!", 
        type: props.type, 
        exactfit: true, 
        onClick: () => {
          alert('do something...')
        }}, 
        ...props,
        ...selectprops,   
    })
  }  

  const noDuration = () => {

    const _selectprops = {...selectprops}
    delete _selectprops.duration;

    addSnack({
      component: Link, 
      props: {
        text: "I'm a link component", 
        href: '#library?component=snackbar&link=clicked', 
        type: props.type, 
        active: true}, 
        ...props,
        ..._selectprops,        
      })
  }

</script>


<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <Button exactfit type='primary' onClick={() => {snacktime()}}>Add Snack</Button>
    <Button exactfit type='secondary' onClick={() => {noDuration()}}>No Duration Snack</Button>
    <Button exactfit type='success' onClick={() => {withLink()}}>Add Snack (with link)</Button>
    <Button exactfit type='warning' onClick={() => {withButton()}}>Add Snack (with component)</Button>
   </div>    
</LibrarySnippet>

