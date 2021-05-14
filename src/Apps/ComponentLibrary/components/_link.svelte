<script>
  import Link from '../../../components/Link/Link'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
</script>

<h1>Link</h1>
<hr>

<CodeBlock title='Properties:' snippet={
  `
  export let href: string|null = null;  
  export let onClick = null;
  export let text = null;
  
  export let active = false;
  export let inherit = false;  
  export let underline = false;
  `} />

<LibraryBlock title='Default:' section >
  <Link href='/' >I am a link</Link>
</LibraryBlock>

<CodeBlock title='Example' snippet={
  `
  <Link href='/' >I am a link</Link>
  `} />  

<LibraryBlock title='Active:' section >
  <Link active href='/' >I am a link</Link>
</LibraryBlock>

<CodeBlock title='Example' snippet={
  `
  <Link active href='/' >I am a link</Link>
  `} />    


<LibraryBlock title='Underline:' section >
  <Link active underline href='/' >I am a link</Link>
</LibraryBlock>

<CodeBlock title='Example' snippet={
  `
  <Link active underline href='/' >I am a link</Link>
  `} />      