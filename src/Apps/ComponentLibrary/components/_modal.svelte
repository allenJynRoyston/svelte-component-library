<script lang='ts'>
    import {getContext} from 'svelte'
    import Button from '@components/Button/Button.svelte'
    import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
    import LibraryBlock from './__LibraryBlock.svelte'
    import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
    import {ModalStore} from '@store/store'

    import ExampleBlock from './_example.svelte'
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
  <div slot='right' style='display: flex: 10px'>
    <Button  type={theme === 'dark' ? 'white' : 'black'} rounded useToggle toggled={rounded} hollow={!rounded} exactfit onClick={() => {rounded = !rounded}} >Rounded</Button>
    <Button  type={theme === 'dark' ? 'white' : 'black'} rounded useToggle toggled={nopadding} hollow={!nopadding} exactfit onClick={() => {nopadding = !nopadding}} >No Padding</Button>
    <Button  type={theme === 'dark' ? 'white' : 'black'} rounded useToggle toggled={shadow} hollow={!shadow} exactfit onClick={() => {shadow = !shadow}} >Shadow</Button>
  </div>
</TwoSlot>
<hr>



<LibraryBlock title="Examples:">
  <Button exactfit onClick={openExampleBasic} >Basic</Button>
  <Button exactfit onClick={openFormExample} >Form</Button>
  <Button exactfit onClick={openCustomExample} >Custom</Button>
</LibraryBlock>

<LibraryBlock title="Location:">
  <Button exactfit onClick={() => {openLocationExample('left')}} >Left</Button>  
  <Button exactfit onClick={() => {openLocationExample('right')}} >Right</Button>  
  <Button exactfit onClick={() => {openLocationExample('corner-right')}} >Corner right</Button>  
  <Button exactfit onClick={() => {openLocationExample('corner-left')}} >Corner left</Button>  
</LibraryBlock>

<LibraryBlock title="Types:">
  <Button exactfit onClick={() => {openTypeExample('black')}} >Black (default)</Button>  
  <Button exactfit onClick={() => {openTypeExample('white')}} >White</Button>  
  <Button exactfit onClick={() => {openTypeExample('primary')}} >Primary</Button>  
  <Button exactfit onClick={() => {openTypeExample('secondary')}} >Secondary</Button>  
  <Button exactfit onClick={() => {openTypeExample('magic')}} >Magic</Button>  
  <Button exactfit onClick={() => {openTypeExample('success')}} >Success</Button>  
  <Button exactfit onClick={() => {openTypeExample('warning')}} >Warning</Button>  
  <Button exactfit onClick={() => {openTypeExample('danger')}} >Danger</Button>  
</LibraryBlock>

<LibraryBlock title="Backdrop:">
  <Button exactfit onClick={() => {openBackdropType('dark')}} >Dark</Button>  
  <Button exactfit onClick={() => {openBackdropType('light')}} >Light</Button>  
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

