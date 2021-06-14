<script lang='ts'>
    import {ModalStore} from '@store/store'
    import Button from '@base/Button.svelte'

    import ExampleBlock from '../components/ExampleBlock.svelte'
    import LoremBlock from '../../../components/@Base/LoremBlock.svelte'

    import LibrarySnippet from './../components/LibrarySnippet.svelte';
    const {setModalState, modalIsBusy, modalProps} = ModalStore

    let propstr = '';
    let selectstr = '';
    let inputstr = '';
    let props; 
    let selectprops;
    let inputprops;

    const snippet = {
      name: 'Modal',
      importName: '@core/Modal.svelte',
      properties: `
        Must pass props through $modalProps:
      `,
      props: {
        rounded: false,
        nopadding: false,
        shadow: false,
        naked: false
      }, 
      dropdowns: [
        {
          label: 'type',
          options: ['primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
          value: 0        
        },
        {
          label: 'location',
          options: ['left', 'right', 'center', 'corner-left', 'corner-right'], 
          value: 2        
        },
        {
          label: 'backdrop',
          options: ['dark', 'light'], 
          value: 0        
        }                    
      ]
    }

    $: livecode = `    
      import {ModalStore} from '@store/store'
      const {setModalState, modalIsBusy, modalProps} = ModalStore

      const openExampleBasic = () => {
        setModalState(true)
        $modalProps = {
          title: 'Basic Example',                
          rounded: true, 
          shadow: true,
          nopadding: false,
          type: 'magic',
          content: {
            component: ExampleBlock,
          },
          onConfirm: () => {
            setModalState(false)
          }                  
        }
      }    

      <Button onClick={openExampleBasic} >Basic</Button>
      `


    const openExampleBasic = () => {
      setModalState(true)
      
      $modalProps = {
        title: 'Basic Example',                
        ...props,
        ...selectprops,
        content: {
          component: props.naked ? LoremBlock : ExampleBlock,
        },
        onConfirm: () => {
          setModalState(false)
        }                  
      }
    }    
     

</script>
  
<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Button exactfit onClick={openExampleBasic} >Open Modal</Button>
   </div>    
</LibrarySnippet>



