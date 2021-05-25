<script lang='ts'>
    import {getContext} from 'svelte'
    import Button from '@components/Button/Button.svelte'
    import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
    import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
    import {ModalStore} from '@store/store'

    import LibraryBlock from '../components/LibraryBlock.svelte'    
    import ExampleBlock from '../components/ExampleBlock.svelte'
    import FormExample from '@components/FormPremade/FormExample.svelte'

    const {setModalState, modalIsBusy, modalProps} = ModalStore
    const theme:string = getContext('theme')

    let rounded = false;
    let nopadding = false;
    let shadow = false;

    const openExampleBasic = () => {
      setModalState(true)
      $modalProps = {
        title: 'Basic Example',                
        rounded, 
        shadow,
        nopadding,
        type: 'magic',
        content: {
          component: ExampleBlock,
        },
        onConfirm: () => {
          setModalState(false)
        }                  
      }
    }    
    
    const openFormExample = () => {
      setModalState(true)
      $modalProps = {
        title: 'Form Example',     
        rounded, 
        shadow,
        nopadding,                   
        content: {
          component: FormExample,
          props: {
            onSubmit: (e) => {              
              $modalIsBusy = true;
              setTimeout(() => {
                setModalState(false)
                $modalIsBusy = false;
              }, 2000)
            }
          }
        }           
      }
    }

    const openCustomExample = () => {
      setModalState(true)
      $modalProps = {
        title: 'Custom Example',    
        rounded, 
        shadow,
        nopadding,        
        confirmBtn: {
          text: "Go!",
          type: 'success',
          size: 'small'
        },
        cancelBtn: {
          text: 'Back!',
          type: 'danger',
        },       
        content: { 
          component: ExampleBlock,
        }, 
        onCancel: () => {
          setModalState(false)
        },
        onConfirm: () => {
          setModalState(false)
        }             
      }
    }    

    const openLocationExample = (location) => {
      setModalState(true)
      $modalProps = {
        title: 'Location Example',    
        rounded, 
        shadow,
        nopadding, 
        location,        
        content: { 
          component: ExampleBlock,
        }, 
        onCancel: () => {
          setModalState(false)
        },
        onConfirm: () => {
          setModalState(false)
        }             
      }
    }        

    const openTypeExample = (type) => {
      setModalState(true)
      $modalProps = {
        title: 'Type Example',    
        rounded, 
        shadow,
        nopadding,
        type,
        content: { 
          component: ExampleBlock,
        }, 
        onCancel: () => {
          setModalState(false)
        },
        onConfirm: () => {
          setModalState(false)
        }             
      }
    }  

    const openBackdropType = (backdrop) => {
      setModalState(true)
      $modalProps = {
        title: 'Backdrop Example',    
        rounded, 
        shadow,
        nopadding,
        backdrop,
        content: { 
          component: ExampleBlock,
        }, 
        onCancel: () => {
          setModalState(false)
        },
        onConfirm: () => {
          setModalState(false)
        }             
      }
    }       

</script>
  
<TwoSlot showLeft showRight>
  <h2>Modal</h2>
  <div slot='right' style='display: flex; gap: 10px'>
    <Button  type={theme === 'dark' ? 'white' : 'black'} rounded useToggle toggled={rounded} hollow={!rounded} nomargin onClick={() => {rounded = !rounded}} >Rounded</Button>
    <Button  type={theme === 'dark' ? 'white' : 'black'} rounded useToggle toggled={nopadding} hollow={!nopadding} nomargin onClick={() => {nopadding = !nopadding}} >No Padding</Button>
    <Button  type={theme === 'dark' ? 'white' : 'black'} rounded useToggle toggled={shadow} hollow={!shadow} nomargin onClick={() => {shadow = !shadow}} >Shadow</Button>
  </div>
</TwoSlot>
<hr>



<LibraryBlock title="Examples:">
  <div slot='right' style='display: flex; gap: 10px'>
    <Button exactfit onClick={openExampleBasic} >Basic</Button>
    <Button exactfit onClick={openFormExample} >Form</Button>
    <Button exactfit onClick={openCustomExample} >Custom</Button>
  </div>
</LibraryBlock>

<LibraryBlock title="Location:">
  <div style='display: flex; gap: 10px'>

    <Button nomargin onClick={() => {openLocationExample('left')}} >Left</Button>  
    <Button nomargin onClick={() => {openLocationExample('right')}} >Right</Button>  
    <Button nomargin onClick={() => {openLocationExample('corner-right')}} >Corner right</Button>  
    <Button nomargin onClick={() => {openLocationExample('corner-left')}} >Corner left</Button>  
  </div>
</LibraryBlock>

<LibraryBlock title="Types:">
  <div style='display: flex; gap: 10px'>
    <Button nomargin onClick={() => {openTypeExample('black')}} >Black (default)</Button>  
    <Button nomargin onClick={() => {openTypeExample('white')}} >White</Button>  
    <Button nomargin onClick={() => {openTypeExample('primary')}} >Primary</Button>  
    <Button nomargin onClick={() => {openTypeExample('secondary')}} >Secondary</Button>  
    <Button nomargin onClick={() => {openTypeExample('magic')}} >Magic</Button>  
    <Button nomargin onClick={() => {openTypeExample('success')}} >Success</Button>  
    <Button nomargin onClick={() => {openTypeExample('warning')}} >Warning</Button>  
    <Button nomargin onClick={() => {openTypeExample('danger')}} >Danger</Button>  
  </div>
</LibraryBlock>

<LibraryBlock title="Backdrop:">
  <div style='display: flex; gap: 10px'>
    <Button nomargin onClick={() => {openBackdropType('dark')}} >Dark</Button>  
    <Button nomargin onClick={() => {openBackdropType('light')}} >Light</Button>  
  </div>
</LibraryBlock>


<CodeBlock open title='Basic Example:' snippet={`
  import {ModalStore} from '@store/store'
  const {setModalState, modalIsBusy, modalProps} = ModalStore

  const openExampleBasic = () => {
    setModalState(true)
    $modalProps = {
      title: 'Basic Example',                
      content: {
        component: ExampleBlock,
      },
      onConfirm: () => {
        setModalState(false)
      }                  
    }
  }      

  <button on:click={openExampleBasic}> Basic </Button>    
  `} />



<CodeBlock open title='Form Example:' snippet={`
  import {ModalStore} from '@store/store'
  const {setModalState, modalIsBusy, modalProps} = ModalStore

    const openFormExample = () => {
      setModalState(true)
      $modalProps = {
        title: 'Form Example',                
        content: {
          component: FormExample,
          props: {
            onSubmit: (e) => {              
              $modalIsBusy = true;
              setTimeout(() => {
                setModalState(false)
                $modalIsBusy = false;
              }, 2000)
            }
          }
        }           
      }
    }

  <button on:click={openFormExample}> Form Example </Button>    
  `} />



<CodeBlock open title='Custom Example:' snippet={`
  import {ModalStore} from '@store/store'
  const {setModalState, modalIsBusy, modalProps} = ModalStore

  const openCustomExample = () => {
    setModalState(true)
    $modalProps = {
      title: 'Custom Example',    
      confirmBtn: {
        text: "Go!",
        type: 'success',
        size: 'small'
      },
      cancelBtn: {
        text: 'Back!',
        type: 'danger',
      },       
      content: { 
        component: ExampleBlock,
      }, 
      onCancel: () => {
        setModalState(false)
      },
      onConfirm: () => {
        setModalState(false)
      }             
    }
  }  

  <button on:click={openCustomExample}> Custom Example </Button>    
  `} />



<CodeBlock open title='Prop Examples:' snippet={`

  $modalProps = {
    ...
    backdrop: 'light' | 'dark',
    rounded: true | false,
    nopadding: true | false,
    shadow: true | false,
    type: 'primary' | 'secondary' | 'magic' | 'success' | 'warning' | 'danger' | 'black' | 'white'
    location: 'center' | 'left' | 'right' | 'corner-left' | 'corner-right'
  }


  `} />

