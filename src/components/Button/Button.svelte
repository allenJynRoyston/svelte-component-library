<script>
  import Link from '../Link/Link.svelte'

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

</script>

{#if !!href}
  <Link {href} >
    <button class={`root-component button ${type} ${size} `} class:rounded={rounded} type='button' data-testid={dataTestid} {role} {disabled} {style} on:click={onClick && !disabled && onClick()}>
      <slot>{text || 'Button'}</slot>
    </button>    
  </Link>
{:else}
  <button class={`root-component button ${type} ${size}`} class:rounded={rounded} type='button' data-testid={dataTestid} {role} {disabled} {style} on:click={onClick && !disabled && onClick()}>
    <slot>{text || 'Button'}</slot>
  </button>
{/if}


<style lang='scss' scoped>
  button{
    outline: none;
    border: none;
    width: 100%;
    padding: 5px;
    cursor: pointer;
    

    &.large{
      font-size: 18px;
      min-width: 100px;      
    }
    
    &.rounded{
      border-radius: 50px;
    }

    &.hollow {
      border: 3px solid white;
      background: none;
      color: white;

      &.dark-theme{
        border: 3px solid #333;
        color: #333;

        &:active{
          background: black;
        }        
      }

    }

    &.primary{      
      border: 3px solid teal;      
      background: teal;
      color: white;
      &:active{
        background: red;
      }           
      

      &.dark-theme{
        border: 3px solid #555;
        background:#555;
        color: white;

        &:active{
          background: black;
        }        
      }
    }

    &.secondary{
      background: orange;
    }

    &.success{
      background: green;
    }


    &:active{
      background: #444;
    }
  }
</style>
