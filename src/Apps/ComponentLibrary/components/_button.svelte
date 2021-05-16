<script>
  import Button from '@components/Button/Button'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'
</script>

<h2>Button</h2>
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
    <Button size='small'>
      Small
    </Button>

    <Button>
      Default
    </Button>

    <Button size='large'>
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


<LibraryBlock title="Disabled: ">
  <div class='button-wrap'>
    <Button type='primary' disabled>
      Primary
    </Button>

    <Button type='secondary' disabled>
      Secondary
    </Button>
    
    <Button type='success' disabled >
      Success
    </Button>  

    <Button type='warning' disabled >
      Warning
    </Button>    
    
    <Button type='danger' disabled>
      Danger
    </Button>      
    
    <Button type='black' disabled>
      Black
    </Button>    
    
    <Button type='white' disabled>
      White
    </Button>        
  </div>     
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
    <Button type='primary' disabled>
      Primary
    </Button> 
    `} />  

<LibraryBlock title="Hollow: ">
  <div class='button-wrap'>
    <Button type='primary' hollow >
      Primary
    </Button>
  
    <Button type='secondary' hollow >
      Secondary
    </Button>
    
    <Button type='success' hollow >
      Success
    </Button>  
  
    <Button type='warning' hollow >
      Warning
    </Button>    
    
    <Button type='danger' hollow >
      Danger
    </Button>   
    
    <Button type='black' hollow>
      Black
    </Button>    
    
    <Button type='white' hollow>
      White
    </Button>      
  </div>     
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  <Button type='primary' rounded>
    Primary
  </Button>
  `} />  

<LibraryBlock title="Rounded: ">
  <div class='button-wrap'>
    <Button type='primary' rounded>
      Primary
    </Button>
  
    <Button type='secondary' rounded >
      Secondary
    </Button>
    
    <Button type='success' rounded>
      Success
    </Button>  
  
    <Button type='warning' rounded >
      Warning
    </Button>    
    
    <Button type='danger' rounded >
      Danger
    </Button>    
    
    <Button type='black' rounded>
      Black
    </Button>    
    
    <Button type='white' rounded>
      White
    </Button>      
  </div>       
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
    <Button type='primary' rounded>
      Primary
    </Button>
  `} />  

<LibraryBlock title="Rounded and Hollow: ">
  <div class='button-wrap'>
    <Button type='primary' rounded hollow>
      Primary
    </Button>
  
    <Button type='secondary' rounded hollow>
      Secondary
    </Button>
    
    <Button type='success' rounded hollow>
      Success
    </Button>  
  
    <Button type='warning' rounded hollow>
      Warning
    </Button>    
    
    <Button type='danger' rounded hollow>
      Danger
    </Button>   
    
    
    <Button type='black' rounded hollow>
      Black
    </Button>    
    
    <Button type='white' rounded hollow>
      White
    </Button>       
  </div>      
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  <Button type='primary' rounded hollow>
    Primary
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