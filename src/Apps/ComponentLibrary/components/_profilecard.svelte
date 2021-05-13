<script lang='ts'>
  import ProfileCard from '../../../components/ProfileCard/ProfileCard.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte';

  let props = {
    name: 'John Smith',
    bgColor: 'red'
  }

</script>

<h1>ProfileCard</h1>
<hr>

<ThemeWrapper theme='light' delay={1} lock>
  <LibraryBlock title="Light Theme:">
    <div style='display: flex; gap: 10px'>
      <ProfileCard {...props} />
      <ProfileCard {...props} />
      <ProfileCard {...props} />
    </div>
  </LibraryBlock>
</ThemeWrapper>

<ThemeWrapper theme='dark' delay={1} lock>
  <LibraryBlock title="Dark Theme:">
    <div style='display: flex; gap: 10px'>
      <ProfileCard {...props} />
      <ProfileCard {...props} />
      <ProfileCard {...props} />
    </div>
  </LibraryBlock>
</ThemeWrapper>

<CodeBlock title='Properties:' snippet={
  `
  `
}/>

<CodeBlock open title='Example:' snippet={`


`
}/>  


