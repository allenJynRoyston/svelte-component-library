<script lang='ts'>
  import {getContext} from 'svelte';
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'  
  import ThemeWrapper from '@components/ThemeWrapper/ThemeWrapper.svelte'

  import ExampleBlock from './_example.svelte'

  const theme:string = getContext('theme')

</script>

<h2>ThemeWrapper</h2>
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
    <ExampleBlock />
</LibraryBlock>


<LibraryBlock title="Dark Theme:" >
  <ThemeWrapper theme='dark' delay={theme === 'dark' ? 1 : 100} alwaysdark>
    <ExampleBlock />
  </ThemeWrapper> 
</LibraryBlock>



<CodeBlock open title='Example:' snippet={`
  <ThemeWrapper theme='light' delay={100} lock>
    <ExampleBlock />
  </ThemeWrapper> 


  <ThemeWrapper theme='dark' delay={100} lock>
    <ExampleBlock />
  </ThemeWrapper>   
  `} />  




