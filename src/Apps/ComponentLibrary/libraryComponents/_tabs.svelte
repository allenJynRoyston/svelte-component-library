<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Tabs from '@components/Tabs/Tabs.svelte'
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'  
  import FormExample from '@components/FormPremade/FormExample.svelte'
  import ExampleBlock from '../components/ExampleBlock.svelte'
  
  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'Tabs',
    importName: '@components/Tabs/Tabs.svelte',
    properties: `
    export let tabRoot = 'tab';
    export let tabs = []
    `
  }

  $: livecode = `    
    const props = { 
      tabRoot: 'tabRoot',
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

    <Tabs ${fullstr} />  
     `

  const staticprops = { 
    tabRoot: 'tabRoot',
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


<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <Tabs {...staticprops} />
   </div>    
</LibrarySnippet>





