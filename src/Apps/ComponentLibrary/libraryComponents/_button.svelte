<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Button from '@base/Button.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  let eventLog = []
  const events = {
    onClick: (val) => {      
      eventLog = [...eventLog, {action: 'onClick', val}]
    } 
  }

  const snippet = {
    name: 'Button',
    importName: '@base/Button.svelte',
    props: {
      useGradiant: false,
      rounded: false,
      hollow: false,
      disabled: false,
      nomargin: false,
      exactfit: true,
      fullOnMobile: false,
      useToggle: false,  
      toggled: false
    }, 
    dropdowns: [
      {
        label: 'applyTheme',
        options: ['primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
        value: 0        
      },
      {
        label: 'size',
        options: ['tiny', 'small', 'normal', 'large'], 
        value: 2        
      }      
    ], 
    inputs: [
      {forprop: 'text', renderAs: 'input', componentprop: {type: 'text'}, value: 'Some button text' },
      {forprop: 'style', renderAs: 'input', componentprop: {type: 'text'}, value: 'margin-bottom: 100px' }
    ]      
  }

  $: livecode = `    
    <Button${propstr}${selectstr}${inputstr} />  
     `

  $: code = `    
    <Button type='primary' ${propstr}>
      Primary
    </Button>

    <Button type='secondary' ${propstr}>
      Secondary
    </Button>
    
    <Button type='success' ${propstr}>
      Success
    </Button>  

    <Button type='warning' ${propstr}>
      Warning
    </Button>    
    
    <Button type='danger' ${propstr}>
      Danger
    </Button>         
    
    <Button type='black' ${propstr}>
      Black
    </Button>    
    
    <Button type='white' ${propstr}>
      White
    </Button>   
     `     
</script>



<LibrarySnippet {...snippet} {livecode} {code} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {eventLog} {events} >
  <div slot='liveexample'>    
    <Button  {...props} {...selectprops} {...inputprops} {...events}/>    
   </div>    
</LibrarySnippet>
