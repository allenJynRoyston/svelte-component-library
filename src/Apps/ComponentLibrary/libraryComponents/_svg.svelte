<script lang="ts">
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import SVG from '@components/SVG/SVG.svelte'
  import GridLayout from '@components/Layout/GridLayout.svelte'

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
    return {component: SVG, props: {icon: svg, title: svg}}
  })


</script>

<TwoSlot showLeft showRight>
  <h2>SVG</h2>
  <div slot='right' style='display: flex; gap 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import SVG from '@components/SVG/SVG.svelte'
  `} />

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

<LibraryBlock title="Default">
  <GridLayout {items} size={50} gap={10} outline/>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
    <SVG icon='home' size={14} />
    `} />

<LibraryBlock title="Size: ">
  <SVG icon='home' size={50} />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  <SVG icon='home' size={50} />
  `} />    

<LibraryBlock title="Fill: ">
  <SVG icon='home' size={50} fill='red' />
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  <SVG icon='home' size={50} ignoreTheme fill='red' />
  `} />  

<LibraryBlock title="Ignore Theme: ">
  <div style='background: white; padding: 20px'>
    <SVG icon='home' size={50} ignoreTheme />
  </div>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <div style='background: white; padding: 20px'>
    <SVG icon='home' size={50} ignoreTheme />
  </div>
  `} />    

<LibraryBlock title="Title (on hover): ">
  <SVG icon='home' size={50} title='I am the title' />
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  <SVG icon='home' size={50} title='I am the title' />
  `} />    