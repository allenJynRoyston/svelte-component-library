<script>
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'  
  import Splash from '../../../components/Splash/Splash.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'

  const props = {
    title: 'Splash Content',
    buttonOne: {
      text: 'CTA 1',
      type: 'primary',
      size: 'large',
      rounded: true,     
    },
    buttonTwo: {
      text: 'CTA 2',
      type: 'hollow',
      size: 'large',
      rounded: true,          
    }       
  }

</script>

<h2>Splash</h2>
<hr>


<ThemeWrapper theme='dark'>
  <LibraryBlock title="Dark Theme:">
    <Splash {...props} />
  </LibraryBlock>
</ThemeWrapper>

<CodeBlock title='Properties:' snippet={
  `
  export let title = 'Splash Title';
  export let buttonOne = null;
  export let buttonTwo = null;
  `} />

<CodeBlock open title='Example:' snippet={`
  const props = {
    title: 'Splash Content',
    buttonOne: {
      text: 'CTA 1',
      type: 'primary',
      size: 'large',
      rounded: true,     
    },
    buttonTwo: {
      text: 'CTA 2',
      type: 'primary',
      size: 'large',
      rounded: true,          
    }       
  }

  <Splash {...props} />
  `} />  




