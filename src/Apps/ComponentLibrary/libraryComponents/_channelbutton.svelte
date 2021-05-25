<script lang='ts'>
  	import LibrarySnippet from './../components/LibrarySnippet.svelte';

    import ChannelButton from '@components/ChannelButton/ChannelButton.svelte'

    let fullstr = '';
    let propstr = '';
    let props; 
    let selectprops; 

    const snippet = {
    name: 'ChannelButton',
    importName: '@components/ChannelButton/ChannelButton.svelte',
    properties: `
    export let leftIcon = null;
    export let rightIcon = null;
    export let content = null;
    export let iconSize = 18;
    export let rounded = false;
    export let nomargin = false;
    export let type = null;
    `,
    props: {
      rounded: false,
      nomargin: false
    }, 
    dropdowns: [
      {
        label: 'type',
        options: [null, 'primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
        value: 0        
      },
      {
        label: 'leftIcon',
        options: [null, 'home', 'globe', 'arrow-left', 'arrow-right'], 
        value: 0        
      },  
      {
        label: 'rightIcon',
        options: [null, 'home', 'globe', 'arrow-left', 'arrow-right'], 
        value: 0        
      },            
      {
        label: 'iconSize',
        options: [18, 24, 30, 36], 
        value: 0        
      }      
    ]
  }

  $: livecode = `    
    <ChannelButton ${fullstr} >
      <h3>Check it out!</h3>
    </ChannelButton>   
     `  

</script>


<LibrarySnippet {...snippet} {livecode}  bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <ChannelButton  {...props} {...selectprops}>
      <h3>Check it out!</h3>
    </ChannelButton>    
   </div>    
</LibrarySnippet>


