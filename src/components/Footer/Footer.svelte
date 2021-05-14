<footer class={`root-component footer`}>
  <slot>
    <p>Developed by Allen Royston | 2021</p>
  </slot>
</footer>

<style lang='scss'>
  .footer{
    width: calc(100% - 40px);
    padding: 20px;    
    display: flex;
    align-content: center;
    justify-content: center;    
    background: var(--white-0);
    color: var(--white-0-text);


    &.dark-theme{
      background: var(--black-2);
      color: var(--black-2-text);
    }
  }
</style>