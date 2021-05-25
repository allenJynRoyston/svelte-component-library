<script lang='ts'>
  import {getContext} from 'svelte';
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Splash from '@components/Splash/Splash.svelte'
  const theme:string = getContext('theme');
  
  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

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

<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <Splash {...staticprops} {...props} {...selectprops} />
  </div>    
</LibrarySnippet>



