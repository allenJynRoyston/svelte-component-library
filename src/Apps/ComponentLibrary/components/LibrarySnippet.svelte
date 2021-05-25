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
          str += ` ${key}`
        }
      }    
    }

    propstr = str;

    if(!!dropdowns){
      dropdowns.forEach(x => {
        const {label, options, value} = x
        if(options[value] !== null){
          str += ` ${label}='${options[value]}'`
          selectprops = {...selectprops, [label]: options[value]}
        }
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
          dropdowns[index].value = val.id
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

<div class='library-snippet'>
  <TwoSlot showLeft showRight>
    <h3>{name}</h3>
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

  {#if !!properties}
    <CodeBlock open show={$showProperties} title='Properties:' snippet={`
      ${properties}
      `} />
  {/if}

  {#if !!props || listofdropdowns().length > 0}
    <LibraryBlock flex title="Props: ">
      <div class='props-container'>
        {#if !!props}
          <div class='buttons'>
            {#each Object.entries(props) as [key, pair]}
              <Button style='min-width: 100px' exactfit type={theme === 'dark' ? 'white' : 'black'} rounded size='small' useToggle toggled={props[key]} hollow={!props[key]} onClick={() => {update(); props[key] = !props[key]}} >
                {key}
              </Button>
            {/each}            
          </div>
        {/if}  
        
        {#if listofdropdowns().length > 0}    
          <div class='dropdowns'>
            {#each listofdropdowns() as props}
              <Select {...props} />
            {/each}   
          </div>    
        {/if}
      </div>
    </LibraryBlock>  
  {/if}

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
</div>

<style lang='scss'>
  @import '../../../scss/src/_media-queries.scss';

  .library-snippet{
    max-width: 1000px;
    margin: auto;
  }

  .props-container{
    width: 100%;          
  }

  .dropdowns{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 5px;   
  }

  .buttons{
    width: 100%;    
    display: flex;
    justify-content: flex-start;
    gap: 5px;   
    flex-wrap: wrap; 
    margin-bottom: 20px;
  }

</style>