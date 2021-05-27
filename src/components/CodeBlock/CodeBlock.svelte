<script lang='ts'>
  import {getContext} from 'svelte'
  import CopyToClipboard from "svelte-copy-to-clipboard";

  import Accordion from '@components/Accordion/Accordion.svelte'
  import Button from '@components/Button/Button.svelte'

  export let title = null;
  export let open = false;
  export let nowrap = false;
  export let show = false;

  export let snippet:string =  `
     const foo = 'foo';
     const bar = 'bar'
  `;

  export let lang:'typescript' | 'css' = 'typescript'

  const theme:string = getContext('theme')
  const addSnack:any =getContext('addSnack')

  const onCopySuccess = () => {    
    addSnack({message: 'Copied!', duration: 2000, type: 'success'})
  }

  const onCopyFail = () => {
    addSnack({message: 'Failed to copy to clipboard.', duration: 2000, type: 'danger'})
  }  

</script>

<CopyToClipboard text={snippet} on:copy={onCopySuccess} on:fail={onCopyFail} let:copy >
  <div class='code-block-container' class:show={show} class:hide={!show}>
    {#if !nowrap}
      <Accordion full {open}>
        <div slot='title'>
          <h3>{title}</h3>
        </div>


        <div slot='content' class={`code-block ${theme}-theme`}>
          <code>
            <pre>
              <div class='copy-btn'>
                <Button type='success' exactfit nomargin hollow onClick={copy}>Copy</Button>
              </div>            
              {snippet}
            </pre>
          </code>    
        </div>
      </Accordion>
    {:else}
      <div class={`code-block ${theme}-theme`}>
        <code>   
          <pre>
            <div class='copy-btn'>
              <Button type='success' exactfit nomargin hollow onClick={copy}>Copy</Button>
            </div>               
            {snippet}
          </pre>
        </code>    
      </div>  
    {/if}
  </div>
</CopyToClipboard>    

<style lang='scss'>
  .code-block-container{
    &.show{
      opacity: 1;
      width: auto;
      height: auto;
    }

    &.hide{
      opacity: 0;
      width: 0;
      height: 0;
    }    
  }
  .code-block{
    overflow-x: auto;
    overflow-y: hidden;
    background: var(--black-0);
    color: var(--primary-1);
    margin: 5px 0;




    &.dark-theme{
      color: var(--success-1);
    }

  }

  code, pre{
    position: relative;
    margin: 0;
    padding: 0;
    color: var(--success-0)
  }  

  .copy-btn{
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>