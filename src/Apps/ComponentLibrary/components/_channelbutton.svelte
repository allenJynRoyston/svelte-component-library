<script lang='ts'>
  import ChannelButton from '../../../components/ChannelButton/ChannelButton.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'
  
</script>

<h2>Channel Button</h2>
<hr>


<LibraryBlock title="Default:">
  <ChannelButton leftIcon='globe' rightIcon='arrow-right' >
    <h3>Check it out!</h3>
  </ChannelButton>
</LibraryBlock>

<ThemeWrapper theme='dark' delay={1}>
  <LibraryBlock title="Dark Theme:">
      <ChannelButton leftIcon='globe' rightIcon='arrow-right' >
        <h3>Check it out!</h3>
      </ChannelButton>  
  </LibraryBlock>
</ThemeWrapper>


<CodeBlock title='Properties:' snippet={`
  export let onClick = () => {}
  export let leftIcon = null;
  export let rightIcon = null;
  export let content = null;
  export let iconSize = 18;
`} />

<CodeBlock open title='Example:' snippet={`
  <ChannelButton leftIcon='globe' rightIcon='plus' >
    <h3>Check it out!</h3>
  </ChannelButton>
`} />  