<script>
  import Button from '../../../components/Button/Button'
  import LibraryBlock from './__LibraryBlock'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'
  
  const onClick = () => {
    console.log('do something')
  }

</script>

<h2>Button</h2>
<hr>

<ThemeWrapper theme='light' delay={1} lock>
  <LibraryBlock title="Light Theme:">
    <div style='display: flex; gap: 20px; margin-bottom: 10px'>
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
    </div> 

    <div style='display: flex; gap: 20px; margin-bottom: 10px'>
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
    </div>     
    
    <div style='display: flex; gap: 20px; margin-bottom: 10px'>
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
    </div> 
    
    <div style='display: flex; gap: 20px; margin-bottom: 10px'>
      <Button type='primary' hollow rounded>
        Primary
      </Button>

      <Button type='secondary' rounded >
        Secondary
      </Button>
      
      <Button type='success' hollow rounded>
        Success
      </Button>  

      <Button type='warning' rounded >
        Warning
      </Button>    
      
      <Button type='danger' hollow rounded >
        Danger
      </Button>          
    </div>     
  </LibraryBlock>
</ThemeWrapper>

<ThemeWrapper theme='dark' delay={1} lock>
  <LibraryBlock title="Dark Theme:" >
    <div style='display: flex; gap: 20px; margin-bottom: 10px'>
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
    </div>  

    <div style='display: flex; gap: 20px; margin-bottom: 10px'>
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
    </div>        

    <div style='display: flex; gap: 20px; margin-bottom: 10px'>
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
    </div>     
    
    <div style='display: flex; gap: 20px; margin-bottom: 10px'>
      <Button type='primary' hollow rounded>
        Primary
      </Button>

      <Button type='secondary' rounded >
        Secondary
      </Button>
      
      <Button type='success' hollow rounded>
        Success
      </Button>  

      <Button type='warning' rounded >
        Warning
      </Button>    
      
      <Button type='danger' hollow rounded >
        Danger
      </Button>          
    </div>        
  </LibraryBlock>
</ThemeWrapper>

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

<CodeBlock open title='Example:' snippet={`
  <Button hollow rounded type='primary'>
    Click Me!
  </Button>
  `} />  




