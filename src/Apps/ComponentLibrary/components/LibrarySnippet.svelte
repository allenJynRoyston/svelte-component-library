<script lang='ts'>
  import {onMount, getContext, tick} from 'svelte'
  import {DeviceStore} from '@store/store'
  import {LibraryStore} from '../localstore/libraryStore'

  import Input from '@components/FormComponents/Input/Input.svelte'
  import Textarea from '@components/FormComponents/Textarea/Textarea.svelte'
  import Select from '@components/FormComponents/Select/Select.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import Button from '@components/Button/Button.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'  

  export let name = null;
  export let importName = null;
  export let properties = null;
  export let inputs = null;
  export let code = null;
  export let livecode = null;
  export let notes = [];

  export let dropdowns = [];

  export let props = null;
  export let selectprops = null;
  export let inputprops = {};
  
  export let propstr = '';
  export let selectstr = '';
  export let inputstr = ''

  const theme:string = getContext('theme')

  const {showImport, showProperties, showExample} = LibraryStore;
  const {isTabletAndBelow} = DeviceStore;

  const update = async(val = null, key = null) => {
    await tick();
    let _propstr = ''
    if(!!props){
      for (const [key, value] of Object.entries(props)) {
        if(value){
          _propstr += ` ${key}`
        }
      }    
    }
    propstr = _propstr;

    let _selectstr = ''
    if(!!dropdowns){
      dropdowns.forEach(({label, options, value}) => {
        if(options[value] !== null){
          _selectstr += ` ${label}='${options[value]}'`
          selectprops = {...selectprops, [label]: options[value]}
        }
      })
    }

    selectstr = _selectstr   
  }

  const updateInputs = (value, key) => {
    inputprops[key] = value

    let _inputstr = ''
    for (const [key, value] of Object.entries(inputprops)) {
      if(value){
        _inputstr += ` ${key}='${value}'`
      }
    }
    inputstr = _inputstr
  }

  $: listofdropdowns = () => {
    const list = []

    dropdowns?.forEach((x, index) => {
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

  $: listofinputs = () => {
    const list = []
    inputs?.forEach(({forprop, componentprop = {}, renderAs, value}) => {
      const obj = {
        label: forprop,
        key: forprop,         
        value, 
        ...componentprop
      }  
      list.push(obj)
    })

    return list
  }  

  onMount(() => {
    update()
    inputs?.forEach(({value, forprop}) => {
      updateInputs(value, forprop)      
    })
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


  {#if $showProperties}
    <LibraryBlock flex title="Props: ">
      {#if !!props || listofdropdowns().length > 0 || listofinputs().length > 0}
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
            <hr>
            <div class='dropdowns'>
              {#each listofdropdowns() as props}
                <Select {...props} />
              {/each}   
            </div>    
          {/if}
        

          {#if listofinputs && listofinputs().length > 0}
            <hr>
            <div class='inputs'>
              {#each listofinputs() as props, index}
                {#if inputs[index].renderAs === 'input'}
                  <Input {...props} onChange={updateInputs} />
                {/if}
                {#if inputs[index].renderAs === 'textarea'}
                  <Textarea {...props} onChange={updateInputs} />
                {/if}              
              {/each}   
            </div>   
          {/if}   
            
        </div>
      {/if}           
    </LibraryBlock>  
  {/if}

  {#if notes.length > 0}
    <LibraryBlock title='Notes:'>
      <ul>
        {#each notes as note, index}
          <li>⭐ {note}</li>
        {/each}
      </ul>
    </LibraryBlock>
  {/if}


  {#if !!livecode}
    <LibraryBlock title='Example:'>
      <slot name='liveexample'>
      </slot>
    </LibraryBlock>

    <CodeBlock show={$showExample} open title='Code:' snippet={`
      ${livecode}
      `} />
  {/if}

  <!-- {#if !!code}
    <LibraryBlock title='Code:'>
      <slot name='example'>
      </slot>
    </LibraryBlock>


    <CodeBlock show={$showExample} open title='Code:' snippet={`
      ${code}
      `} />
  {/if} -->
</div>

<style lang='scss'>
  @import '../../../scss/src/_media-queries.scss';

  .library-snippet{
    max-width: 1000px;
    margin: auto;
  }

  ul, li{
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .props-container{
    width: 100%;          
  }

  .dropdowns, .inputs{
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