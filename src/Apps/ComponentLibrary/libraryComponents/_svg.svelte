<script lang="ts">
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import {svgslist} from '@components/SVG/SVG.svelte'
  import SVG from '@components/SVG/SVG.svelte'
  import GridLayout from '@components/Layout/GridLayout.svelte'
  import SVGPreview from '../components/SVGPreview.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  let eventLog = []
  const events = {
    onClick: (val) => {      
      eventLog = [...eventLog, {action: 'onClick', val}]
    } 
  }  

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
    dropdowns: [
      {
        label: 'icon',
        options: svgslist, 
        value: 0        
      },
      {
        label: 'applyTheme',
        options: [null, 'primary', 'secondary', 'magic', 'success', 'warning', 'danger'], 
        value: 0        
      }               
    ],
    inputs: [
      {forprop: 'index', renderAs: 'input', componentprop: {type: 'number'}, value: 0 },
      {forprop: 'title', renderAs: 'input', componentprop: {type: 'text'}, value: 'SVG Title' },
      {forprop: 'fill', renderAs: 'input', componentprop: {type: 'text', placeholder: '#f2f2f2 or color name (i.e. red)'}, value: null },
      {forprop: 'style', renderAs: 'input', componentprop: {type: 'text', placeholder: 'outline: 1px solid red'}, value: null },
      {forprop: 'size', renderAs: 'input', componentprop: {type: 'number'}, value: 22 }
    ], 
    notes: [
      'Fill takes priority over applyTheme.'
    ]  
  }

  $: livecode = `    
    <SVG${propstr}${selectstr}${inputstr}/>
     `
   

  export let items = svgslist.map(svg =>{
    return {component: SVGPreview, props: {icon: svg, title: svg}}
  })

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} {eventLog} {events}>
  <div slot='liveexample'>    
    <SVG  {...props} {...selectprops} {...inputprops} {...events}/>
    <br>
    <hr>
    <br>
    <GridLayout {items} size={125} gap={10} outline/>
   </div>    
</LibrarySnippet>

