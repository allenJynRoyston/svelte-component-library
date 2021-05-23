<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import Splash from '@components/Splash/Splash.svelte'
  
  const theme:string = getContext('theme')

  const props = {
    title: 'Splash Content',
    buttonOne: {
      text: 'CTA 1',
      type: 'secondary',
      rounded: true,     
    },
    buttonTwo: {
      text: 'CTA 2',
      type: theme === 'dark' ? 'white' : 'black',
      rounded: true,  
      hollow: true        
    }       
  }

</script>

<TwoSlot showLeft showRight>
  <h2>Splash</h2>
  <div slot='right' style='display: flex; gap 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Splash from '@components/Splash/Splash.svelte'
  `} />

<CodeBlock title='Properties:' snippet={
  `
  export let title = 'Splash Title';
  export let buttonOne = null;
  export let buttonTwo = null;
  `} />


<Splash {...props} />



<CodeBlock open title='Example:' snippet={`
  const props = {
    title: 'Splash Content',
    buttonOne: {
      text: 'CTA 1',
      type: 'secondary',
      size: 'large',
      rounded: true,     
    },
    buttonTwo: {
      text: 'CTA 2',
      type: theme === 'dark' ? 'white' : 'black',
      size: 'large',
      rounded: true,  
      hollow: true        
    }       
  }
  
  <Splash {...props} />
  `} />  




