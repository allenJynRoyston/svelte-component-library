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
    color: #333;


    &.dark-theme{
      background: #555;
      color: white;
    }
  }
</style>