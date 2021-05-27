<script lang='ts'>
  import {getContext} from 'svelte';
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Splash from '@components/Splash/Splash.svelte'
  const theme:string = getContext('theme');
  
  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'Splash',
    importName: '@components/Splash/Splash.svelte',
    properties: `
    export let title = 'Splash Title';
    export let version = null;
    export let buttonOne = null;
    export let buttonTwo = null;
    `,
  }

  $: livecode = `    
      const props = {
        title: 'Splash Content',
        version: '1.0',
        buttonOne: {
          text: 'CTA 1',
          type: 'secondary',
          rounded: true,     
        },
        buttonTwo: {
          text: 'CTA 2',
          type: 'primary',
          rounded: true,  
          hollow: true        
        }       
      } 

     <Splash  {...props}  />
     `
     
  const staticprops = {
    title: 'Splash Content',
    version: '1.0',
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

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Splash {...staticprops} {...props} {...selectprops}
{...inputprops} />
  </div>    
</LibrarySnippet>



