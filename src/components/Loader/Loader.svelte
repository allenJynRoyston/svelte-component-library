<script lang='ts'>
  export let show = false
  export let rounded = false;
  export let type = 'primary'
  export let skinny = false;
  export let nobg = false;
  export let fade = false;

</script>

{#if show}
  <div class={`root-component loader`}  class:nobg={nobg} class:rounded={rounded} class:skinny={skinny}>
    <div class={`line ${type}`} class:fade={fade} class:rounded={rounded} />
  </div>
{/if}

<style lang='scss' scoped>

.loader {
  background: var(--white-5);
  width: 100%;
  height: 10px;
  overflow: hidden;
  position: relative;

  &.nobg{
    background: transparent;
  }

  &.skinny{
    height: 2px;
  }

  &.rounded{
    border-radius: 10px;
  }

  .line {

    &.primary{
      background: var(--primary-0);
    }
    &.secondary{
      background: var(--secondary-0);
    }    
    &.magic{
      background: var(--magic-0);
    }    
    &.success{
      background: var(--success-0);
    }   
    &.danger{
      background: var(--danger-0);
    }   
    &.warning{
      background: var(--warning-0);
    }   
    &.black{
      background: var(--black-0);
    }   
    &.white{
      background: var(--white-0);
    }                        
   
    &.rounded{
      border-radius: 10px;
    }

    position: absolute;
    left: 0;
    z-index: 1;
    width: 300px;
    height: 10px;
    animation: line-bounce-fade 1500ms infinite;

    &.fade{
      animation: fade-out 1000ms infinite;
    }

  }  

  &.dark-theme{
    background: var(--black-4);
    .line{
      &.primary{
        background: var(--primary-0);
      }
      &.secondary{
        background: var(--secondary-0);
      }      
    }
  }
}



@keyframes line-bounce {
  0%{
    left: calc(100% - 300px);
  }
  50%{
    left: 0;
  }
  100%{
    left: calc(100% - 300px);
  }
}


@keyframes fade-out {
  0%{
    left: calc(0%);
    opacity: 1;
  }
  100%{
    left: calc(100%);
    opacity: 0;
  }
}
</style>