<script lang='ts'>
  import ProfileCard from '../../../components/ProfileCard/ProfileCard.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'

  let props = {
    name: 'John Smith',
    bgColor: 'red'
  }

</script>

<h1>ProfileCard</h1>
<hr>

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


