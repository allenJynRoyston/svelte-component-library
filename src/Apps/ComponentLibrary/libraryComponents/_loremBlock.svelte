<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'

</script>


<TwoSlot showLeft showRight>
  <h2>LoremBlock</h2>
  <div slot='right' style='display: flex; gap 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import LoremBlock from '@components/LoremBlock/LoremBlock'
  `} />

<CodeBlock title='Properties:' snippet={
  `
  export let style = null;
  export let index = null;
  export let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla at volutpat diam ut venenatis tellus in metus. Molestie nunc non blandit massa enim nec dui. Orci ac auctor augue mauris augue neque gravida in. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at. A diam maecenas sed enim ut sem. Scelerisque in dictum non consectetur a erat nam. Cursus eget nunc scelerisque viverra mauris. Id velit ut tortor pretium viverra suspendisse potenti nullam ac. Mauris rhoncus aenean vel elit scelerisque mauris. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris. Tellus integer feugiat scelerisque varius morbi enim nunc."
  export let onClick = () => {};
  export let length = 1;  
  `} />

<LibraryBlock title="Default">
  <LoremBlock />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <LoremBlock />
  `} />  

<LibraryBlock title="Length">
  <LoremBlock length={3} />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <LoremBlock length={3} />
  `} />  

<LibraryBlock title="Content">
  <LoremBlock content="Hello World!" />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <LoremBlock content="Hello World!" />
  `} />  