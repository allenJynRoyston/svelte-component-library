<script lang='ts'>
  import {getContext} from 'svelte';
  import SVG from '@components/SVG/SVG.svelte'

  export let onClick = () => {}
  export let leftIcon = null;
  export let rightIcon = null;
  export let content = null;
  export let iconSize = 18;
  export let rounded = false;
  export let nomargin = false;
  export let type = null;
  export let style = '';

  let ele;

  const theme:string = getContext('theme')
  const colors:any = getContext('colors')
  
  $: useType = (type === null ? (theme === 'dark' ? 'black' : 'white') : type)
  $: fill = !!useType ? colors[useType][4].textFriendlyColor : (theme === 'dark' ? 'black' : 'white')

 
</script>

<button class={`channel-button ${useType}`} {style} class:rounded={rounded} class:nomargin={nomargin} on:click={onClick} bind:this={ele}>
  <div class='icon' >
    <SVG icon={leftIcon || 'globe'} {fill} ignoreTheme size={iconSize} />
  </div>
  <div class='content' type='button' on:click={onClick}>
    <slot>
      {content || 'Button'}
    </slot>
  </div>
  <div class='icon' >
    <SVG icon={rightIcon || 'arrow-right'} {fill} ignoreTheme size={iconSize} />
  </div>
</button>


<style lang='scss' scoped>

  .channel-button{
    width: calc(100% - 6px);
    height: auto;
    padding: 5px 0;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    outline: none;
    margin: 5px 0;


    &.nomargin{
      margin: 0;
    }

    &.rounded{
      border-radius: 20px;
    }    

    background: var(--white-0);
    color: var(--white-0-text);
    border: 3px solid var(--black-1);

    &.primary{
      background: var(--primary-4);
      color: var(--primary-4-text);
      border: 3px solid var(--primary-1);
      &:active{      
        background: var(--primary-5);
      }          
    }

    &.secondary{
      background: var(--secondary-4);
      color: var(--secondary-4-text);
      border: 3px solid var(--secondary-1);
      &:active{      
        background: var(--secondary-5);
      }          
    }

    &.magic{
      background: var(--magic-4);
      color: var(--magic-4-text);
      border: 3px solid var(--magic-1);
      &:active{      
        background: var(--magic-5);
      }          
    }   

    &.success{
      background: var(--success-4);
      color: var(--success-4-text);
      border: 3px solid var(--success-1);
      &:active{      
        background: var(--success-5);
      }          
    }     

    &.warning{
      background: var(--warning-4);
      color: var(--warning-4-text);
      border: 3px solid var(--warning-1);
      &:active{      
        background: var(--warning-5);
      }          
    }     

    &.danger{
      background: var(--danger-4);
      color: var(--danger-4-text);
      border: 3px solid var(--danger-1);
      &:active{      
        background: var(--danger-5);
      }          
    }               

    &.black{
      background: var(--black-4);
      color: var(--black-4-text);
      border: 3px solid var(--white-1);
      &:active{      
        background: var(--black-5);
      }          
    }    

    &.white{
      background: var(--white-6);
      color: var(--white-6-text);
      border: 3px solid var(--black-2);
      &:active{      
        background: var(--white-6);
      }          
    }            
    
  }

  .icon{
    width: 50px;    
  }

  .content{
    width: 100%;    
    text-align: left;
  }
</style>
