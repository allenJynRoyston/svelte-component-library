<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import RImage from '@images/RImage.svelte'
  
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
    }      
  }  

  const snippet = {
    name: 'RImag',
    importName: '@images/RImage.svelte',
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
        <RImage${propstr}${selectstr}${inputstr} />
      </div>
     `  

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {eventLog} {events}>
  <div slot='liveexample'>    
    <div style='max-width: 800px; margin: auto'>
      <RImage {...events} {...props} {...selectprops} {...inputprops} />
    </div>
  </div>    
</LibrarySnippet>


