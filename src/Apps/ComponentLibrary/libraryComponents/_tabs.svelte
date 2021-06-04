<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Tabs from '@base/Tabs.svelte'
  import LoremBlock from '@base/LoremBlock.svelte'  
  import FormExample from '@examples/FormExample.svelte'
  import ExampleBlock from '../components/ExampleBlock.svelte'
  
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
    name: 'Tabs',
    importName: '@components/Tabs/Tabs.svelte',
    dropdowns: [
      {
        label: 'applyTheme',
        options: [ null, 'white', 'black', 'primary', 'secondary', 'magic', 'success', 'warning', 'danger'], 
        value: 0        
      }   
    ],
    inputs: [
      {forprop: 'hashNav', renderAs: 'input', componentprop: {type: 'text'}, value: 'tabroot' }      
    ]       
  }

  $: livecode = `    
    const props = { 
      tabs: [
        {
          title: "Example Block",
          component: ExampleBlock
        },      
        {
          title: "Hello World",
          component: LoremBlock,
          props: {
            content: "Hello World!"
          }
        },
        {
          title: "Form Example",
          param: 'form-example',
          component: FormExample
        },          
      ]    
    }

    <Tabs {props} ${propstr}${selectstr}${inputstr} />  
     `

  const staticprops = { 
    tabs: [
      {
        title: "Example Block",
        component: ExampleBlock
      },      
      {
        title: "Hello World",
        component: LoremBlock,
        props: {
          content: "Hello World!"
        }
      },
      {
        title: "Form Example",
        param: 'form-example',
        component: FormExample
      },          
    ]    
  }

</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {eventLog} {events}>
  <div slot='liveexample'>    
    <Tabs {...staticprops} {...props} {...selectprops} {...inputprops} {...events}/>
   </div>    
</LibrarySnippet>





