<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import ProfileCard from '@components/ProfileCard/ProfileCard.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'ProfileCard',
    importName: '@components/ProfileCard/ProfileCard.svelte',
    properties: `
    export let name = 'John Smith';
    export let image = null;
    export let bgColor = null;
    export let props = null;
    `
  }

  $: livecode = `    
  <div style='height: 400px; display: flex; gap: 10px'>
    <ProfileCard ${propstr}${selectstr}${inputstr} />
    <ProfileCard ${propstr}${selectstr}${inputstr} />
    <ProfileCard ${propstr}${selectstr}${inputstr} />
  </div>
  `

  let staticprops = {
    name: 'John Smith',
    bgColor: 'red'
  }

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <div style='height: 400px; display: flex; gap: 10px'>
      <ProfileCard {...staticprops} />
      <ProfileCard {...staticprops} />
      <ProfileCard {...staticprops} />
    </div>
   </div>    
</LibrarySnippet>


