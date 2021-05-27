<script lang='ts'>
  import {getContext} from 'svelte';
  import Link from '@components/Link/Link.svelte'
  import ColorText from '@components/ColorText/ColorText.svelte'

  const theme:string = getContext('theme');

</script>

<footer class={`footer ${theme}-theme`}>
  <slot>
    <p>Developed by <ColorText type='secondary'><Link inherit href='https://github.com/allenRoyston' target="_blank">Allen Royston</Link></ColorText> | 2021</p>
  </slot>
</footer>

<style lang='scss'>
  .footer{
    width: calc(100% - 40px);
    padding: 20px;    
    display: flex;
    align-content: center;
    justify-content: center;    
    background: var(--white-3);
    color: var(--white-3-text);


    &.dark-theme{
      background: var(--black-1);
      color: var(--black-1-text);
    }
  }
</style>