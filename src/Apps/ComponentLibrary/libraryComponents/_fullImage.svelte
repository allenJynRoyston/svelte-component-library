<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import FullImage from '@images/FullImage.svelte'
  
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
    name: 'FullImage',
    importName: '@images/FullImage.svelte',
    props: {
      shadow: false,
      rounded: false,      
    },      
    inputs: [
      {forprop: 'src', renderAs: 'input', componentprop: {type: 'text'}, value: 'https://picsum.photos/id/12/1440/600' },
      {forprop: 'alt', renderAs: 'input', componentprop: {type: 'text'}, value: 'image alt' },
    ]
  }

  $: livecode = `    
      <div style='width: 100%; height: 600px'>
        <FullImage${propstr}${selectstr}${inputstr} />
      </div>
     `  

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {eventLog} {events}>>
  <div slot='liveexample'>    
    <div style='width: 100%; height: 600px'>
      <FullImage {...events} {...props} {...selectprops} {...inputprops} />
    </div>
  </div>    
</LibrarySnippet>


