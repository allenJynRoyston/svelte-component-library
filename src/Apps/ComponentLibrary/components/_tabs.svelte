<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
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


<TwoSlot showLeft showRight>
  <h2>Tabs</h2>
  <div slot='right' style='display: flex: 10px'>
  </div>
</TwoSlot>
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




