<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import NavBar from '@components/NavBar/NavBar.svelte'
  
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


<TwoSlot showLeft showRight>
  <h2>NavBar</h2>
  <div slot='right' style='display: flex; gap 10px'>
  </div>
</TwoSlot>
<hr>


<CodeBlock open title='Import:' snippet={`
  import NavBar from '@components/NavBar/NavBar.svelte'
  `} />

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




