<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Link from '@base/Link.svelte'

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
    name: 'Link',
    importName: '@base/Link.svelte',
    props: {
      underline: false,
      inherit: false,
      active: true,
      outline: false,
      exactfit: false,
      applyHover: false,
      applyActive: false
    }, 
    dropdowns: [
      {
        label: 'type',
        options: ['auto', 'primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
        value: 0        
      },
      {
        label: 'target',
        options: [null, '_blank', '_self', '_parent', '_top'], 
        value: 0        
      }           
    ], 
    inputs: [
      {forprop: 'text', renderAs: 'input', componentprop: {type: 'text'}, value: 'I am a link' },
      {forprop: 'href', renderAs: 'input', componentprop: {type: 'text'}, value: '/#something' },
      {forprop: 'classes', renderAs: 'input', componentprop: {type: 'text', placeholder: 'semi-bold italic'}, value: null },
      {forprop: 'style', renderAs: 'input', componentprop: {type: 'text', placeholder: 'margin-bottom: 20px'}, value: null },
    ]
  }  

  $: livecode = `    
    <div style='color: red'>
      <Link${propstr}${selectstr}${inputstr}>
        I am a link
      </Link>   
    </div>
     `  
   
</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {eventLog} {events}>
  <div slot='liveexample' style='color: red'>    
    <Link {...props} {...selectprops} {...inputprops} {...events}/>
   </div>    
</LibrarySnippet>

