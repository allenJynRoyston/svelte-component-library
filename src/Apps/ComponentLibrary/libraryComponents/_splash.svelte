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
    inputs: [
      {forprop: 'title', renderAs: 'input', componentprop: {type: 'text'}, value: 'Splash title!' },
      {forprop: 'version', renderAs: 'input', componentprop: {type: 'text'}, value: '0.9' }
    ]        
  }

  $: livecode = `    
      const props = {
        buttonOne: {
          text: 'CTA 1',
          applyTheme: 'secondary',
          rounded: true,     
        },
        buttonTwo: {
          text: 'CTA 2',
          applyTheme: theme === 'dark' ? 'white' : 'black',
          rounded: true,  
          hollow: true        
        }    
      } 

     <Splash {...props}${propstr}${selectstr}${inputstr}/>
     `
     
  const staticprops = {
    buttonOne: {
      text: 'Action 1',
      applyTheme: 'secondary',
      rounded: true,     
    },
    buttonTwo: {
      text: 'Action 2',
      applyTheme: theme === 'dark' ? 'white' : 'black',
      rounded: true,  
      hollow: true        
    }       
  }     

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Splash {...staticprops} {...props} {...selectprops} {...inputprops} />
  </div>    
</LibrarySnippet>



