<nav>
  <slot>
    <h1>Svelte Component Library</h1>
  </slot>
</nav>


<style>
  nav{
    width: calc(100% - 40px);
    padding: 20px;

    display: flex;
    align-content: center;
    justify-content: center;    

    background: black;
    color: white

  }

</style>