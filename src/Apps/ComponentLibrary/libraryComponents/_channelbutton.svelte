<script lang='ts'>
  	import LibrarySnippet from './../components/LibrarySnippet.svelte';

    import ChannelButton from '@base/ChannelButton.svelte'
    import {svgslist} from '@base/SVG.svelte'

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
    name: 'ChannelButton',
    importName: '@base/ChannelButton.svelte',
    props: {
      rounded: false,
      nomargin: false
    }, 
    dropdowns: [
      {
        label: 'applyTheme',
        options: ['default', 'primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
        value: 0        
      },
      {
        label: 'leftIcon',
        options: [...svgslist], 
        value: 11        
      },  
      {
        label: 'rightIcon',
        options: [...svgslist], 
        value: 32        
      },            
      {
        label: 'iconSize',
        options: [18, 24, 30, 36], 
        value: 0        
      }      
    ],
    inputs: [
      {forprop: 'content', renderAs: 'input', componentprop: {type: 'text'}, value: 'Some button text' },
      {forprop: 'style', renderAs: 'input', componentprop: {type: 'text', placeholder: 'border: 1px solid red'}, value: null }
    ]    
  }

  $: livecode = `    
    <ChannelButton${propstr}${selectstr}${inputstr} />
     `  


</script>
<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {eventLog} {events}>
  <div slot='liveexample'>    

    <ChannelButton {...props} {...selectprops} {...inputprops} {...events} >
      
    </ChannelButton>    
   </div>    
</LibrarySnippet>


