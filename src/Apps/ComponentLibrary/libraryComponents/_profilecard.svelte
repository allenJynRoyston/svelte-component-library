<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';
  import ProfileCard from '@components/ProfileCard/ProfileCard.svelte'
  import {DeviceStore} from '@store/store';

  const {isMobile} = DeviceStore;

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
      innerShadow: true,
      rounded: false,
      useBGImage: false,
      useGradiant: false
    },
    dropdowns: [
      {
        label: 'type',
        options: ['light', 'dark'], 
        value: 0        
      },       
      {
        label: 'applyTheme',
        options: ['primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
        value: 0        
      }, 
      {
        label: 'imageType',
        options: ['circle', 'rounded', 'flat', 'background'], 
        value: 0        
      },       
    ],
    inputs: [
      {forprop: 'name', renderAs: 'input', componentprop: {type: 'text'}, value: 'First Last' },
      {forprop: 'profession', renderAs: 'input', componentprop: {type: 'text'}, value: 'Developer' },
      {forprop: 'title', renderAs: 'input', componentprop: {type: 'text'}, value: 'Level 99' },
      {forprop: 'imageSrc', renderAs: 'input', componentprop: {type: 'text'}, value: 'https://picsum.photos/id/10/200/300' }
    ]          
  }

  $: livecode = `    
  const props = {
    links: [
      {icon: 'facebook', href: '/facebook'},
      {icon: 'instagram', href: '/instagram'},
      {icon: 'email', href: '/email'},
      {icon: 'whatsapp', href: '/whatsapp'}
    ]
  }

  <div style='height: 400px; display: flex; gap: 10px'>
    <ProfileCard {props} ${propstr}${selectstr}${inputstr} />
  </div>
  `

  const staticprops = {
    links: [
      {icon: 'facebook', href: '/facebook'},
      {icon: 'instagram', href: '/instagram'},
      {icon: 'email', href: '/email'},
      {icon: 'whatsapp', href: '/whatsapp'}
    ]
  }


</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <div style='display: flex; gap: 10px'>
      <ProfileCard {...staticprops} {...props} {...selectprops} {...inputprops} {...events}/>    
    </div>
    {#if !$isMobile}
      <div style='display: flex; gap: 10px; margin-top: 20px;'>
        <ProfileCard {...staticprops} {...props} {...selectprops} {...inputprops} {...events}/>    
        <ProfileCard {...staticprops} {...props} {...selectprops} {...inputprops} {...events}/>    
      </div>    
    {/if}
   </div>    
</LibrarySnippet>


