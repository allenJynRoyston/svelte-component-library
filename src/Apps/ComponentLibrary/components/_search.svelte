<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import Search from '@components/Search/Search.svelte'
</script>

<TwoSlot showLeft showRight>
  <h2>Search</h2>
  <div slot='right' style='display: flex: 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Search from '@components/Search/Search'
  `} />

<CodeBlock title='Properties:' snippet={
  `
  export let debounceTime = 0;
  export let hideClear = false;
  export let onSearch = () => {}  
  `} />

<LibraryBlock title="Default">
  <Search />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <Search />
  `} />  
