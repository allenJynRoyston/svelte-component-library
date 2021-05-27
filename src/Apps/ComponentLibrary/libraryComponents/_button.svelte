<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Button from '@components/Button/Button.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'Button',
    importName: '@components/Button/Button.svelte',
    properties: `
    export let onClick = null
    export let disabled = false
    export let style = null
    export let role = 'button'
    export let dataTestid = null
    export let text = null

    export let type = 'primary';
    export let href = null;
    export let rounded = false;
    export let size = ''
    export let hollow = false;
    export let target = null;
    export let exactfit = false;
    export let nomargin = false;  

    export let useToggle = false;
    export let toggled = false;
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
    ]
  }

  $: livecode = `    
    <Button ${fullstr} >
      Content
    </Button>   
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

<LibrarySnippet {...snippet} {livecode} {code} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <Button  {...props} {...selectprops}>
      {selectprops?.type}
    </Button>
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
