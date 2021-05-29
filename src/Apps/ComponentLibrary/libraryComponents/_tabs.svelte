<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Tabs from '@components/Tabs/Tabs.svelte'
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'  
  import FormExample from '@components/FormPremade/FormExample.svelte'
  import ExampleBlock from '../components/ExampleBlock.svelte'
  
  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

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


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Tabs {...staticprops} {...props} {...selectprops}
{...inputprops} />
   </div>    
</LibrarySnippet>





