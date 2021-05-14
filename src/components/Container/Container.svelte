<script>
  export let offset = 0;

</script>

<div class={`root-component container offset-${offset}`}>
  <slot />
</div>


<style lang='scss'>
  .container{
    background: var(--white-0);
    color: var(--white-0-text);

    &.dark-theme{
      background: var(--black-4);
      color: var(--black-4-text);
    }

    &.offset-1{
      background: var(--white-1);
      color: var(--white-1-text);

      &.dark-theme{
        background: var(--black-5);
        color: var(--black-5-text);
      }
    }

    &.offset-2{
      background: var(--white-2);
      color: var(--white-2-text);

      &.dark-theme{
        background: var(--black-6);
        color: var(--black-6-text);
      }
    }

    &.offset-1{
      background: var(--white-1);
      color: var(--white-1-text);

      &.dark-theme{
        background: var(--black-5);
        color: var(--black-5-text);
      }
    }

    &.offset-3{
      background: var(--white-3);
      color: var(--white-3-text);

      &.dark-theme{
        background: var(--black-7);
        color: var(--black-7-text);
      }
    }  

    &.offset-4{
      background: var(--white-4);
      color: var(--white-4-text);

      &.dark-theme{
        background: var(--black-8);
        color: var(--black-8-text);
      }
    }            
  }
</style>