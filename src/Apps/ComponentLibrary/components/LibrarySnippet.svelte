<script lang='ts'>
  import {onMount, getContext, tick} from 'svelte'  
  import {LibraryStore} from '../localstore/libraryStore'

  import Input from '@form/Input.svelte'
  import Textarea from '@form/Textarea.svelte'
  import InputDate from '@form/InputDate.svelte'
  import InputTime from '@form/InputTime.svelte'
  import Select from '@form/Select.svelte'
  import CodeBlock from '@base/CodeBlock.svelte'
  import TwoSlot from '@base/TwoSlot.svelte'
  import Button from '@base/Button.svelte'

  import GridLayout from '@layout/GridLayout.svelte'
    

  import LibraryBlock from '../components/LibraryBlock.svelte'  

  export let name = null;
  export let importName = null;
  export let properties = null;
  export let inputs = null;
  export let code = null;
  export let livecode = null;
  export let notes = [];
  export let eventLog = [];
  export let events = null;

  export let dropdowns = [];

  export let props = null;
  export let selectprops = null;
  export let inputprops = {};
  
  export let propstr = '';
  export let selectstr = '';
  export let inputstr = ''

  const theme:string = getContext('theme')

  const {showImport, showProperties, showCode, showExample, showActions} = LibraryStore;  

  const updateProps = async(val = null, key = null) => {
    await tick();
    let _propstr = ''
    if(!!props){
      for (const [key, value] of Object.entries(props)) {
        if(!!value){
          _propstr += ` ${key}`
        }
      }    
    }
    propstr = _propstr;
  }

  const updateSelect = async() => {    
    let _selectstr = ''
    if(!!dropdowns){
      dropdowns.forEach(({label, options, value = 0}) => {

        if(!!options[value]){
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
      const {renderAs} = inputs.find(x => x.forprop === key)
      if(!!value){
        _inputstr += renderAs === 'textarea' ? ` ${key}={\`${value}\`}` : ` ${key}='${value}'`
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
          dropdowns[index].value = val?.id
          updateSelect()
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

  let eventList = !!events ? Object.keys(events).map(title => {
    return {title, toggled: true }
  }) : []

  const toggleEvent = (index) => {
    eventList = eventList.map((x, i) => {
      if(i === index){
        x.toggled = !x.toggled
      }
      return x
    })
  }

  
  onMount(() => {
    updateProps();
    updateSelect();
    inputs?.forEach(({value, forprop}) => {
      updateInputs(value, forprop)      
    })
  })
  
</script>

<div class='library-snippet'>
  <TwoSlot nopadding>
    <h3 slot='left'>{name}</h3>
    <div slot='right' style='display: flex; gap: 5px; flex-wrap: wrap'>
      <Button exactfit applyTheme={theme === 'dark' ? 'white' : 'black'} size='small' useToggle toggled={$showImport} hollow={!$showImport} nomargin onClick={() => {$showImport = !$showImport}} >Import</Button>        
      <Button exactfit applyTheme={theme === 'dark' ? 'white' : 'black'} size='small' useToggle toggled={$showActions} hollow={!$showActions} nomargin onClick={() => {$showActions = !$showActions}} >Actions</Button>    
      <Button exactfit applyTheme={theme === 'dark' ? 'white' : 'black'} size='small' useToggle toggled={$showProperties} hollow={!$showProperties} nomargin onClick={() => {$showProperties = !$showProperties}} >Properties</Button>    
      <Button exactfit applyTheme={theme === 'dark' ? 'white' : 'black'} size='small' useToggle toggled={$showExample} hollow={!$showExample} nomargin onClick={() => {$showExample = !$showExample}} >Example</Button>    
      <Button exactfit applyTheme={theme === 'dark' ? 'white' : 'black'} size='small' useToggle toggled={$showCode} hollow={!$showCode} nomargin onClick={() => {$showCode = !$showCode}} >Code</Button>    
    </div>  
  </TwoSlot>
  <hr>


  <CodeBlock open show={$showImport} title='Import:' snippet={`
    import ${name} from '${importName}'
    `} />


  {#if $showProperties}
    <LibraryBlock flex title="Properties: ">
      {#if !!props || listofdropdowns().length > 0 || listofinputs().length > 0}
        <div class='props-container'>
          {#if !!props}
            <div class='buttons'>
              {#each Object.entries(props) as [key, pair]}
                <Button style='min-width: 100px' exactfit applyTheme={theme === 'dark' ? 'white' : 'black'} rounded size='small' useToggle toggled={props[key]} hollow={!props[key]} onClick={() => {updateProps(); props[key] = !props[key]}} >
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
                {#if inputs[index].renderAs === 'inputdate'}
                  <InputDate {...props} onChange={updateInputs} />
                {/if}  
                {#if inputs[index].renderAs === 'inputtime'}
                  <InputTime {...props} onChange={updateInputs} />
                {/if}                                           
              {/each}   
            </div>   
          {/if}   

          {#if listofinputs && listofinputs().length > 0}
            <br>
            <div class='inputs'>
              {#each listofinputs() as props, index}
                {#if inputs[index].renderAs === 'textarea'}
                  <Textarea {...props} onChange={updateInputs} />
                {/if}              
              {/each}   
            </div>   
          {/if}             
            
        </div>
      {:else}
        <p>No properties</p>
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
    {#if $showExample}
      <LibraryBlock title='Example:'>
        <slot name='liveexample'>
        </slot>
      </LibraryBlock>
    {/if}

    <CodeBlock show={$showCode} open title='Code:' snippet={`
      ${livecode}
      `} />
  {/if}

  {#if !!events && $showActions}    
    <LibraryBlock hideFull title='Actions:'>
      <div class='actions'>
        {#each eventList as {title, toggled}, index}        
          <Button size='small' exactfit applyTheme='white' {toggled} useToggle onClick={() => {toggleEvent(index)}}>
            {title}
          </Button>
        {/each}
      </div>

      {#each eventLog as log}     
        {#if eventList.find(x => x.title === log.action).toggled}
          {JSON.stringify(log, null, 4)}
          <br>
        {/if}          
      {/each}
    </LibraryBlock>    
  {/if}    

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
    font-size: 12px;
  }

  .actions{
    display: flex;
    gap: 5px;
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
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