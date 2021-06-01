<script lang='ts'>
  	import LibrarySnippet from './../components/LibrarySnippet.svelte';

    import ChannelButton from '@components/ChannelButton/ChannelButton.svelte'
    import {svgslist} from '@components/SVG/SVG.svelte'

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
    importName: '@components/ChannelButton/ChannelButton.svelte',
    props: {
      rounded: false,
      nomargin: false
    }, 
    dropdowns: [
      {
        label: 'type',
        options: [null, 'primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
        value: 0        
      },
      {
        label: 'leftIcon',
        options: [null, ...svgslist], 
        value: 0        
      },  
      {
        label: 'rightIcon',
        options: [null, ...svgslist], 
        value: 0        
      },            
      {
        label: 'iconSize',
        options: [18, 24, 30, 36], 
        value: 0        
      }      
    ],
    inputs: [
      {forprop: 'content', renderAs: 'input', componentprop: {type: 'text'}, value: 'Some button text' },
      {forprop: 'style', renderAs: 'input', componentprop: {type: 'text'}, value: 'margin-bottom: 100px' }
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


