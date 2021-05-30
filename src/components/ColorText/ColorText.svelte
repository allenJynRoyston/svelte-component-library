<script lang='ts'>
  import {getContext} from 'svelte';

  export let applyTheme = 'primary'

  const theme:string = getContext('theme');
</script>

<span class={`color-text ${applyTheme} ${theme}-theme`} >
  <slot />
</span>

<style lang='scss' scoped>
  .primary{
    color: var(--primary-0)!important;
  }

  .secondary{
    color: var(--secondary-0);
  }

  .magic{
    color: var(--magic-0);
  }  

  .success{
    color: var(--success-0);
  }

  .warning{
    color: var(--warning-0);
  }

  .danger{
    color: var(--danger-0);
  }


  .dark-theme{
    &.primary{
      color: var(--primary-1);
    }

    &.secondary{
      color: var(--secondary-1);
    }

    &.magic{
      color: var(--magic-1);
    }      

    &.success{
      color: var(--success-1);
    }

    &.warning{
      color: var(--warning-1);
    }

    &.danger{
      color: var(--danger-1);
    }
  }
</style>