<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import SmartImage from '@images/SmartImage.svelte'
  
  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  let eventLog = []
  const events = {
    onClick: (val) => {
      snippet.inputs[0].value = val;
      eventLog = [...eventLog, {action: 'onClick', val}]
    },
    onImageLoad: (val) => {
      eventLog = [...eventLog, {action: 'onClick', val}]
    }
  }  

  const snippet = {
    name: 'RImag',
    importName: '@images/SmartImage.svelte',
    props: {
      shadow: false,
      rounded: false,      
    },        
    dropdowns: [
      {
        label: 'preference',
        options: ['width', 'height'], 
        value: 0        
      },  
    ],    
    inputs: [
      {forprop: 'src', renderAs: 'input', componentprop: {type: 'text'}, value: 'https://picsum.photos/id/100/640/480' },
      {forprop: 'alt', renderAs: 'input', componentprop: {type: 'text'}, value: 'image alt' },
    ]
  }

  $: livecode = `    
      <div style='max-width: 800px; margin: auto'>
        <SmartImage${propstr}${selectstr}${inputstr} />
      </div>
     `  

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {eventLog} {events}>
  <div slot='liveexample'>    
    <div style='max-width: 800px; margin: auto'>
      <SmartImage {...events} {...props} {...selectprops} {...inputprops} />
    </div>
  </div>    
</LibrarySnippet>


