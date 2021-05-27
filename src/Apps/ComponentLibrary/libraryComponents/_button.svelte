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
    properties: `
    export let style = null
    export let text = null
    export let href = null;
    export let dataTestid = null

    export let role = 'button'
    export let type = 'primary';
    export let size = 'normal'

    export let disabled = false
    export let rounded = false;
    export let hollow = false;
    export let target = null;
    export let exactfit = false;
    export let fullOnMobile = false;
    export let nomargin = false;  
    export let useToggle = false;
    export let toggled = false;

    export let onClick = null
    `,
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
        label: 'type',
        options: ['primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
        value: 0        
      },
      {
        label: 'size',
        options: ['tiny', 'small', 'normal', 'large'], 
        value: 0        
      }      
    ], 
    inputs: [
      {label: 'text', prop: 'text', renderAs: 'input', value: 'Some button text'},
      {label: 'style', prop: 'style', renderAs: 'input', value: 'min-width: 200px'}      
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

   <div slot='example'>
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
   </div>
</LibrarySnippet>
