<script>
  import Link from '../../../components/Link/Link'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'

</script>

<h1>Link</h1>
<hr>

<ThemeWrapper theme='light' delay={1} lock>
  <LibraryBlock title='Light theme:' >
    <Link href='/' >I am a link</Link>
  </LibraryBlock>
</ThemeWrapper>

<ThemeWrapper theme='dark' delay={1} lock>
  <LibraryBlock title='Dark Theme:' section >
    <Link href='/' >I am a link</Link>
  </LibraryBlock>
</ThemeWrapper>

<CodeBlock title='Properties:' snippet={
  `
  export let href: string
  export let active = false;
  export let onClick = null;
  export let text = null;
  `} />

<CodeBlock title='Example' snippet={
  `
  <Link href='/' >I am a link</Link>
  `} />  