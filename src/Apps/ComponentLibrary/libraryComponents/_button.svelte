<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import LibraryBlock from '../components/LibraryBlock.svelte'


  let rounded = false;
  let hollow = false;
  let disabled = false;

  let isToggled = false;

  const theme:string = getContext('theme')

</script>

<TwoSlot showLeft showRight>
  <h2>Button</h2>
  <div slot='right' style='display: flex; gap: 5px'>
    <Button  type={theme === 'dark' ? 'white' : 'black'} rounded useToggle toggled={rounded} hollow={!rounded} nomargin onClick={() => {rounded = !rounded}} >Rounded</Button>
    <Button  type={theme === 'dark' ? 'white' : 'black'} rounded useToggle toggled={hollow} hollow={!hollow} nomargin onClick={() => {hollow = !hollow}} >Hollow</Button>
    <Button  type={theme === 'dark' ? 'white' : 'black'} rounded useToggle toggled={disabled} hollow={!disabled} nomargin onClick={() => {disabled = !disabled}} >Disabled</Button>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Button from '@components/Button/Button'
  `} />

<CodeBlock title='Properties:' snippet={
  `
  export let onClick = null
  export let disabled = false
  export let style = null
  export let role = 'button'
  export let dataTestid = null
  export let text = null

  export let type = 'primary';
  export let href = null;
  export let rounded = false;
  export let size = 'normal'
  export let hollow = false;
  
`} />

<LibraryBlock title="Default: ">
    <div class='button-wrap'>          
      <Button type='primary' {rounded} {hollow} {disabled}>
        Primary
      </Button>

      <Button type='secondary' {rounded} {hollow} {disabled}>
        Secondary
      </Button>
      
      <Button type='success' {rounded} {hollow} {disabled}>
        Success
      </Button>  

      <Button type='warning' {rounded} {hollow} {disabled}>
        Warning
      </Button>    
      
      <Button type='danger' {rounded} {hollow} {disabled}>
        Danger
      </Button>         
      
      <Button type='black' {rounded} {hollow} {disabled}>
        Black
      </Button>    
      
      <Button type='white' {rounded} {hollow} {disabled}>
        White
      </Button>          
    </div>     
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
      <Button type='primary'>
        Primary
      </Button>

      <Button type='secondary'>
        Secondary
      </Button>
      
      <Button type='success' >
        Success
      </Button>  

      <Button type='warning' >
        Warning
      </Button>    
      
      <Button type='danger' >
        Danger
      </Button>   

      <Button type='black'>
        Black
      </Button>    
      
      <Button type='white'>
        White
      </Button>          
`} />  

<LibraryBlock title="Sizes: ">
  <div class='button-wrap'>          
    <Button size='small' {rounded} {hollow} {disabled}>
      Small
    </Button>

    <Button {rounded} {hollow} {disabled}>
      Default
    </Button>

    <Button size='large' {rounded} {hollow} {disabled}>
      Large
    </Button>       
  </div>     
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
    <Button size='small'>
      Small
    </Button>

    <Button>
      Default
    </Button>

    <Button size='large'>
      Large
    </Button>          
`} />  


<LibraryBlock title="Toggle: ">
  <div class='button-wrap' style='max-width: 200px'>          
    <Button  size='small' type={theme === 'dark' ? 'white' : 'black'} useToggle toggled={isToggled} {rounded} {hollow} {disabled} onClick={() => {isToggled = !isToggled}}>
      Small
    </Button>
    <Button  type={theme === 'dark' ? 'white' : 'black'} useToggle toggled={isToggled} {rounded} {hollow} {disabled} onClick={() => {isToggled = !isToggled}}>
      Default
    </Button>
    <Button  size='large' type={theme === 'dark' ? 'white' : 'black'} useToggle toggled={isToggled} {rounded} {hollow} {disabled} onClick={() => {isToggled = !isToggled}}>
      Large
    </Button>        
   
  </div>     
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
    <Button  toggled={isToggled} onClick={() => {isToggled = !isToggled}}>
      Toggle
    </Button>     
`} />  




<style lang='scss'>
  @import "../../../scss/src/_media-queries.scss";

  .button-wrap{
    display: flex; 
    gap: 20px;
    @include tablet-landscape-and-below  {
      flex-wrap: wrap
    }
              
  }
</style>