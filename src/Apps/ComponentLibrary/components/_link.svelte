<script>
  import Link from '../../../components/Link/Link'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'

</script>

<h1>Link</h1>
<hr>

<LibraryBlock section >
  <Link href='/' >I am a link</Link>
</LibraryBlock>

<ThemeWrapper theme='dark'>
  <LibraryBlock section >
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