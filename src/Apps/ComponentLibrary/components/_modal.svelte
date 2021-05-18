<script lang='ts'>
    import {openModal, modalBusy, modalProps} from '../../../stores/store'


    import LibraryBlock from './__LibraryBlock.svelte'
    import ExampleBlock from './_example.svelte'

    import Button from '@components/Button/Button.svelte'
    import FormExample from '@components/FormPremade/FormExample.svelte'
    import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

    const openExampleBasic = () => {
      $openModal = true;
      $modalProps = {
        title: 'Basic Example',                
        content: {
          component: ExampleBlock,
        },
        onConfirm: () => {
          $openModal = false
        }                  
      }
    }    
    
    const openFormExample = () => {
      $openModal = true;
      $modalProps = {
        title: 'Form Example',                
        content: {
          component: FormExample,
          props: {
            onSubmit: (e) => {
              console.log(e)
              $modalBusy = true;
              setTimeout(() => {
                $openModal = false
                $modalBusy = false;
              }, 2000)
            }
          }
        }           
      }
    }

    const openCustomExample = () => {
      $openModal = true;
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
          $openModal = false
        },
        onConfirm: () => {
          $openModal = false
        }             
      }
    }    

</script>
  
<h1>Modal</h1>
<hr>

<LibraryBlock title="Basic:">
  <Button exactfit onClick={openExampleBasic} >Basic</Button>
</LibraryBlock>

<!-- <Button exactfit onClick={openExampleOne} >Form Example</Button>
<Button exactfit type='secondary' onClick={openExampleTwo} >Content Example</Button>
  -->
<CodeBlock open title='Basic Example:' snippet={`
  const openExampleBasic = () => {
    $openModal = true;
    $modalProps = {
      title: 'Form Example',                
      content: {
        component: ExampleBlock,
      },
      onConfirm: () => {
        $openModal = false
      }                  
    }
  }      

  <button on:click={openExampleBasic}> Basic </Button>    
  `} />

<LibraryBlock title="Form Example:">
  <Button exactfit onClick={openFormExample} >Form Example</Button>
</LibraryBlock>


<CodeBlock open title='Basic Example:' snippet={`
    const openFormExample = () => {
      $openModal = true;
      $modalProps = {
        title: 'Form Example',                
        content: {
          component: FormExample,
          props: {
            onSubmit: (e) => {
              console.log(e)
              $modalBusy = true;
              setTimeout(() => {
                $openModal = false
                $modalBusy = false;
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
    const openCustomExample = () => {
      $openModal = true;
      $modalProps = {
        title: 'ExampleBlock',    
        confirmBtn: {
          text: "Go!",
          type: 'success'
        },
        cancelBtn: {
          text: 'Back!',
          type: 'danger'
        },       
        content: { 
          component: ExampleBlock,
        }, 
        onCancel: () => {
          $openModal = false
        },
        onConfirm: () => {
          $openModal = false
        }             
      }
    }  

  <button on:click={openCustomExample}> Custom Example </Button>    
  `} />



