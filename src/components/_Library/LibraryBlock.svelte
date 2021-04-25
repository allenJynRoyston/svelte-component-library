<script>
  import CodeBlock from '../CodeBlock/CodeBlock'

  export let code = false;
  export let section = false;
  export let style = null;

</script>

<div class='library-block' {style}>
  <h3 class='title'>
    <slot name='title' />
  </h3>

  {#if section}
    <div class='section'>    
      <slot />
    </div>   
  {/if}
  
  {#if code}
    <CodeBlock>
      <slot name='codeblock' />
    </CodeBlock>  
  {/if}
</div>

<style lang='scss' scoped>
  .library-block{
    margin: 20px 0;

    .title{
      width: 100%;
      display: flex;
      margin: 0;
      padding: 0;
    }
      
    .section{
      color: white;
      background: #717E8E;
      padding: 20px;
      width: calc(100% - 40px);   
    }  
  }
</style>