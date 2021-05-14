<script lang='ts'>
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'  
  import NavBar from '../../../components/NavBar/NavBar.svelte'

  const currentUrl = '#components?page=library&component=navbar&'

  const props = {
    watchProp: 'link',
    links: [
      {title: 'Home', active: true, icon: 'icon', href: `${currentUrl}link=home`},
      {title: 'About', icon: 'icon', href: `${currentUrl}link=about`},
      {title: 'Contact', icon: 'icon', href: `${currentUrl}link=contact`}
    ]    
  }

</script>

<h2>NavBar</h2>
<hr>

<LibraryBlock title="Default:">
  <NavBar {...props} />
</LibraryBlock>


<CodeBlock title='Properties:' snippet={
  `
  export let links = []
  export let watchHash = null;
  export let watchProp = null;
  `} />

<CodeBlock open title='Example:' snippet={`
  const props = {
    watchProp: 'link',
    links: [
      {title: 'Home', active: true, icon: 'icon', href: '&link=home'},
      {title: 'About', icon: 'icon', href: '&link=about'},
      {title: 'Contact', icon: 'icon', href: '&link=contact'},
    ]    
  }

  <Splash {...props} />
  `} />  




