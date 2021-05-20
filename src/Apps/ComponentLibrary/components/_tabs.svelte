<script lang='ts'>
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'  
  import Tabs from '@components/Tabs/Tabs.svelte'

  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'  
  import FormExample from '@components/FormPremade/FormExample.svelte'
  import ExampleBlock from './_example.svelte'
  
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

</script>

<h2>Tabs</h2>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Tabs from '@components/Tabs/Tabs.svelte'
  `} />

<CodeBlock title='Properties:' snippet={
  `
  export let tabRoot = 'tab';
  export let tabs = []  
  `} />

<hr>
<br><br>
<Tabs {...props} />
<br><br>
<hr>


<CodeBlock open title='Example:' snippet={`
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

  <Tabs {...props} />  
  `} />  




