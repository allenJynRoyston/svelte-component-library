<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'LoremBlock',
    importName: '@components/LoremBlock/LoremBlock.svelte',
    properties: `
    export let style = null;
    export let index = null;
    export let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla at volutpat diam ut venenatis tellus in metus. Molestie nunc non blandit massa enim nec dui. Orci ac auctor augue mauris augue neque gravida in. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at. A diam maecenas sed enim ut sem. Scelerisque in dictum non consectetur a erat nam. Cursus eget nunc scelerisque viverra mauris. Id velit ut tortor pretium viverra suspendisse potenti nullam ac. Mauris rhoncus aenean vel elit scelerisque mauris. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris. Tellus integer feugiat scelerisque varius morbi enim nunc."
    export let onClick = () => {};
    export let length = 1;
    `
  }

  $: livecode = `    
    <LoremBlock ${propstr}${selectstr}${inputstr} />
     `

</script>


<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <LoremBlock  {...props} {...selectprops}
{...inputprops} />
   </div>    
</LibrarySnippet>
