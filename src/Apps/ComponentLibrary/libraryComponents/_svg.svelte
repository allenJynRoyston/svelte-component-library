<script lang="ts">
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import SVG from '@components/SVG/SVG.svelte'
  import GridLayout from '@components/Layout/GridLayout.svelte'
  import SVGPreview from '../components/SVGPreview.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

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

  const snippet = {
    name: 'SVG',
    importName: '@components/SVG/SVG.svelte',
    properties: `
    export let size:number = 14; 
    export let fill:string|null = null;
    export let icon:IconTypes = null
    export let index:number|null = null;
    export let title:string|null = null;
    export let style:string|null = null;
    export let onClick:(index) => void|null = null;
    export let ignoreTheme = false;
    `,
    props: {
      ignoreTheme: false
    }, 
    dropdowns: [
      {
        label: 'fill',
        options: [null, 'red', 'green', 'blue'], 
        value: 0        
      },      
      {
        label: 'size',
        options: [10, 14, 18, 22, 26, 30, 50 , 100], 
        value: 6        
      },
      {
        label: 'icon',
        options: svgs, 
        value: 0        
      }            
    ]
  }

  $: livecode = `    
    <SVG${propstr}${selectstr}${inputstr}/>
     `
   

  export let items = svgs.map(svg =>{
    return {component: SVGPreview, props: {icon: svg, title: svg}}
  })

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <SVG  {...props} {...selectprops}
{...inputprops} />
    <br>
    <hr>
    <br>
    <GridLayout {items} size={125} gap={10} outline/>
   </div>    
</LibrarySnippet>

