<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Button from '@components/Button/Button.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'Button',
    importName: '@components/Button/Button.svelte',
    props: {
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



<LibrarySnippet {...snippet} {livecode} {code} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Button  {...props} {...selectprops} {...inputprops} />    
   </div>    

   <!-- <div slot='example'>
    <Button type='primary' {...props}>
      Primary
    </Button>

    <Button type='secondary'  {...props}>
      Secondary
    </Button>
    
    <Button type='success'{...props}>
      Success
    </Button>  

    <Button type='warning' {...props}>
      Warning
    </Button>    
    
    <Button type='danger' {...props}>
      Danger
    </Button>         
    
    <Button type='black' {...props}>
      Black
    </Button>    
    
    <Button type='white' {...props}>
      White
    </Button>   
   </div> -->
</LibrarySnippet>
