<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import ProfileCard from '@components/ProfileCard/ProfileCard.svelte'

  let props = {
    name: 'John Smith',
    bgColor: 'red'
  }

</script>

<TwoSlot showLeft showRight>
  <h2>ProfileCard</h2>
  <div slot='right' style='display: flex: 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import ProfileCard from '@components/ProfileCard/ProfileCard.svelte'
  `} />

<CodeBlock title='Properties:' snippet={
  `
  `
}/>

<LibraryBlock title="dEFAULT:">
  <div style='display: flex; gap: 10px'>
    <ProfileCard {...props} />
    <ProfileCard {...props} />
    <ProfileCard {...props} />
  </div>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`


`
}/>  


