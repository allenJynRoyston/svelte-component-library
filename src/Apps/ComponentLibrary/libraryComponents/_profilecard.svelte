<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import ProfileCard from '@components/ProfileCard/ProfileCard.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  let eventLog = []
  const events = {
    onClick: (val) => {      
      eventLog = [...eventLog, {action: 'onClick', val}]
    } 
  }

  const snippet = {
    name: 'ProfileCard',
    importName: '@components/ProfileCard/ProfileCard.svelte',
    props:{
      shadow: false,
      innerShadow: false
    },
    dropdowns: [
      {
        label: 'applyTheme',
        options: ['primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
        value: 0        
      }, 
    ],
    inputs: [
      {forprop: 'name', renderAs: 'input', componentprop: {type: 'text'}, value: 'Firstname Lastname' },
      {forprop: 'imageSrc', renderAs: 'input', componentprop: {type: 'text'}, value: 'https://picsum.photos/200/300' }
    ]          
  }

  $: livecode = `    
  <div style='height: 400px; display: flex; gap: 10px'>
    <ProfileCard ${propstr}${selectstr}${inputstr} />
  </div>
  `


</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <div style='height: 400px; display: flex; gap: 10px'>
      <ProfileCard {...props} {...selectprops} {...inputprops} {...events}/>    
    </div>
   </div>    
</LibrarySnippet>


