<script lang='ts'>
    import {ModalStore} from '@store/store'

    import LibraryBlock from './__LibraryBlock.svelte'
    import ExampleBlock from './_example.svelte'

    import Button from '@components/Button/Button.svelte'
    import FormExample from '@components/FormPremade/FormExample.svelte'
    import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

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

</script>
  
<h1>Modal</h1>
<p>Best to avoid use of modals on mobile, as they have no way to retain state.</p>
<p>Use Channels instead.</p>
<hr>

<LibraryBlock title="Basic:">
  <Button exactfit onClick={openExampleBasic} >Basic</Button>
</LibraryBlock>

<!-- <Button exactfit onClick={openExampleOne} >Form Example</Button>
<Button exactfit type='secondary' onClick={openExampleTwo} >Content Example</Button>
  -->
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

<LibraryBlock title="Form Example:">
  <Button exactfit onClick={openFormExample} >Form Example</Button>
</LibraryBlock>


<CodeBlock open title='Basic Example:' snippet={`
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


<LibraryBlock title="Form Example:">
  <Button exactfit onClick={openCustomExample} >Custom Example</Button>
</LibraryBlock>


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



