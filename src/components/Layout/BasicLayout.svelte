<div class='layout'>

  <div class='directory'>
    <slot name='directory'>
      Directory
    </slot>
  </div>

  <div class='content'>
    <slot>
      <p>Content</p>
    </slot>
  </div>
</div>

<style lang='scss' scoped>
  .layout{
    width: 100%;
    display: flex;
    overflow: auto;

    .directory{
      width: auto;
      height: 100vh;
      padding: 10px 50px 10px 10px;
      background: grey;
      color: white;

      a{
        margin: 2px 0;
        cursor: pointer;
        &.active{
          color: red;
        }
      }
    }

    .content{      
      width: 100%;
      padding: 10px;
      overflow: hidden;
    }
  }
</style>
