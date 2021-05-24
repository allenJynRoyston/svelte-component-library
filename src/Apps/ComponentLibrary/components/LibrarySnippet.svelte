<script lang='ts'>
  import {onMount, getContext, tick} from 'svelte'
  import {DeviceStore} from '@store/store'
  import {LibraryStore} from '../localstore/libraryStore'
  
  import Select from '@components/FormComponents/Select/Select.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import Button from '@components/Button/Button.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'  

  export let name = null;
  export let importName = null;
  export let properties = null;
  export let code = null;
  export let livecode = null;

  export let props = null;
  export let dropdowns = [];
  export let selectprops = null;
  
  export let fullstr = '';
  export let propstr = '';

  const theme:string = getContext('theme')

  const {showImport, showProperties, showExample} = LibraryStore;
  const {isTabletAndBelow} = DeviceStore;

  const update = async() => {
    await tick();
    let str = ''
    if(!!props){
      for (const [key, value] of Object.entries(props)) {
        if(value){
          str += `${key} `
        }
      }    
    }

    propstr = str;

    if(!!dropdowns){
      dropdowns.forEach(x => {
        const {label, options, value} = x
        str += `${label}='${options[value]}'`
        selectprops = {...selectprops, [label]: options[value]}
      })
    }

    fullstr = str   
  }

  $: listofdropdowns = () => {
    const list = []

    dropdowns.forEach((x, index) => {
      let {label, options, value} = x

      options = options.map((title, id) => {
        return {id, title}
      })

      const obj = {
        label: label.toUpperCase(), 
        options, 
        value,        
        defaultOption: 'Select an option',
        onInitFilter: (val, options) => {   
          return options.find(x => x.id === val)
        },
        onChangeFilter: (val) => {    
          dropdowns[0].value = val.id
          update()
        }
      }  
      list.push(obj)
    })

    return list
  }

  onMount(() => {
    update()
  })


</script>

<TwoSlot showLeft showRight>
  <div slot='right' style='display: flex; gap: 5px'>
    <Button type={theme === 'dark' ? 'white' : 'black'} size='small' useToggle toggled={$showImport} hollow={!$showImport} nomargin onClick={() => {$showImport = !$showImport}} >Import</Button>        
    <Button type={theme === 'dark' ? 'white' : 'black'} size='small' useToggle toggled={$showProperties} hollow={!$showProperties} nomargin onClick={() => {$showProperties = !$showProperties}} >Properties</Button>    
    <Button type={theme === 'dark' ? 'white' : 'black'} size='small' useToggle toggled={$showExample} hollow={!$showExample} nomargin onClick={() => {$showExample = !$showExample}} >Code</Button>    
  </div>  
</TwoSlot>
<hr>


<CodeBlock open show={$showImport} title='Import:' snippet={`
  import ${name} from '${importName}'
  `} />


<CodeBlock open show={$showProperties} title='Properties:' snippet={`
  ${properties}
  `} />


<LibraryBlock flex title="Props: ">
  <div class='props-container'>
    {#if listofdropdowns().length > 0}        
      <div class='props-wrap'>
        {#each listofdropdowns() as props}
          <Select {...props} exactfit={!$isTabletAndBelow} />
        {/each}   
      </div>
    {/if}
    
    {#if !!props}
      <div class='props-wrap' style="transform: translateY(3px)">      
        {#each Object.entries(props) as [key, pair]}
          <Button exactfit type={theme === 'dark' ? 'white' : 'black'} rounded size='small' useToggle toggled={props[key]} hollow={!props[key]} onClick={() => {update(); props[key] = !props[key]}} >
            {key}
          </Button>
        {/each}            
      </div>    
    {/if}
  </div>
</LibraryBlock>  

{#if !!livecode}
  <LibraryBlock title='Live:'>
    <slot name='liveexample'>
    </slot>
  </LibraryBlock>

  <CodeBlock show={$showExample} open title='Live example:' snippet={`
    ${livecode}
    `} />
{/if}

{#if !!code}
  <LibraryBlock title='Example:'>
    <slot name='example'>
    </slot>
  </LibraryBlock>


  <CodeBlock show={$showExample} open title='Example:' snippet={`
    ${code}
    `} />
{/if}

<style lang='scss'>
  @import '../../../scss/src/_media-queries.scss';

  .props-container{
    width: 100%; 
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    gap: 10px;
    flex-direction: column;
    @include tablet-landscape-and-up{
      flex-direction: row;
    }         
  }

  .props-wrap{
    flex: 1;
    display: flex; 
    gap: 5px; 
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
    @include tablet-landscape-and-up{
      flex-wrap: none;
    }             
  }
</style>