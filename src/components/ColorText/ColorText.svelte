<script lang='ts'>
  export let type = 'primary'
  export let bold = false;
</script>

<span class={`root-component color-text ${type}`} class:bold={bold}>
  <slot />
</span>

<style lang='scss' scoped>
  .bold{
    font-weight: 700
  }

  .primary{
    color: var(--primary-0);
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
    .primary{
        color: var(--primary-0);
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
  }
</style>