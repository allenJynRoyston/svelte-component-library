<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import ThemeWrapper from '@components/ThemeWrapper/ThemeWrapper.svelte'
  import ExampleBlock from '../components/ExampleBlock.svelte'

  const theme:string = getContext('theme')

</script>

<TwoSlot showLeft showRight>
  <h2>ThemeWrapper</h2>
  <div slot='right' style='display: flex; gap 10px'>
  </div>
</TwoSlot>
<hr>


<CodeBlock open title='Import:' snippet={`
  import ThemeWrapper from '@components/ThemeWrapper/ThemeWrapper.svelte'
  `} />

<CodeBlock title='Properties:' snippet={`
  export let theme = 'light'
  export let delay = 1;
  export let refresh = true;
  export let ele = null;
  export let themeWatch = false;
  export let lock = false;
  `} />



<LibraryBlock title="Light Theme:" >
  <ThemeWrapper  alwayslight>
    <ExampleBlock />
  </ThemeWrapper> 
</LibraryBlock>

<LibraryBlock title="Dark Theme:" >
  <ThemeWrapper alwaysdark>
    <ExampleBlock />
  </ThemeWrapper>   
</LibraryBlock>



<CodeBlock open title='Example:' snippet={`
  <ThemeWrapper  alwayslight>
    <ExampleBlock />
  </ThemeWrapper> 


  <ThemeWrapper alwaysdark>
    <ExampleBlock />
  </ThemeWrapper>   
  `} />  




