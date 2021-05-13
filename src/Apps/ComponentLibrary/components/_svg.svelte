<script lang="ts">
import SVG from '../../../components/SVG/SVG.svelte'
import LibraryBlock from './__LibraryBlock.svelte'
import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
import GridLayout from '../../../components/Layout/GridLayout.svelte'
import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'

const svgs = [
  'dots',
  'home',
  'spinner',
  'cogs',
  'fire',
  'usertie',
  'search',
  'cross',
  'globe',
  'image',
  'star-full',
  'star-empty',
  'comments',
  'chain',
  'chainbroken',
  'plus',
  'minus',
  'checkbox-unchecked',
  'checkbox-checked',
  'locked',
  'unlocked',
  'file-text',
  'youtube',
  'like',
  'dislike',
  'love',
  'camera',
  'save',
  'grid-small',
  'grid-large',
  'showcase',
  'arrow-left',
  'arrow-right',
  'edit',
  'bin',
  'display',
  'play',
  'friend',
  'list',
  'bell',
  'people',
  'shield',
  'edit',
  'link',
  'flag',
  'post',
  'checkmark',
  'happy',
  'sad',
  'angry',
  'wink',
  'shocked',
  'crying',
  'baffled',
  'bullhorn',
  'circleup',
  'warning',
  'notification',
  'email',
  'instagram',
  'linkedin',
  'conversation',
  'globe2',
  'share',
  'stats',
  'upload',
  'menu',
  'hashtag',
  'refresh'
]


export let items = svgs.map(svg =>{
  return {component: SVG, props: {icon: svg}}
})


</script>

<h1>SVG</h1>
<hr>

<ThemeWrapper theme='light' delay={1} lock>
  <LibraryBlock title="Light Theme:">
    <GridLayout {items} size={50} gap={10} outline/>
  </LibraryBlock>
</ThemeWrapper>

<ThemeWrapper theme='dark' delay={1} lock>
  <LibraryBlock title="Dark Theme:">
    <GridLayout {items} size={50} gap={10} outline/>
  </LibraryBlock>
</ThemeWrapper>


<CodeBlock title='Properties:' snippet={
    `
    export let size:number = 14;
    export let fill:string|null = null;
    export let icon:IconTypes = null
    export let index:number|null = null;
    export let title:string|null = null;
    export let style:string|null = null;
    export let onClick:(index) => void|null = null;
    `} />

<CodeBlock open title='Example:' snippet={`
    <SVG icon='home' size='14' />
    `} />
