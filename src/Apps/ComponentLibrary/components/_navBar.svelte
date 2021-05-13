<script lang='ts'>
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'  
  import NavBar from '../../../components/NavBar/NavBar.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte';

  const props = {
    links: [
      {title: 'Home', active: true, icon: 'icon', href: '#components?component=header&link=home'},
      {title: 'About', icon: 'icon', href: '#components?component=header&link=about'},
      {title: 'Contact', icon: 'icon', href: '#components?component=header&link=contact'}
    ]    
  }

</script>

<h2>NavBar</h2>
<hr>

<LibraryBlock title="Default:">
  <NavBar {...props} />
</LibraryBlock>

<ThemeWrapper theme='dark' delay={1}>
  <LibraryBlock title="Dark Theme:">
    <NavBar {...props} />
  </LibraryBlock>
</ThemeWrapper>


<CodeBlock title='Properties:' snippet={
  `
  export let links = []
  `} />

<CodeBlock open title='Example:' snippet={`
  const props = {
    links: [
      {title: 'Home', icon: 'icon', href: '#components?component=header&link=home'},
      {title: 'About', icon: 'icon', href: '#components?component=header&link=about'},
      {title: 'Contact', icon: 'icon', href: '#components?component=header&link=contact'}
    ]    
  }

  <Splash {...props} />
  `} />  




