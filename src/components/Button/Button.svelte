<script>
  export let onClick = null
  export let disabled = false
  export let style = null
  export let role = 'button'
  export let dataTestid = null
  export let text = null
</script>

<button type='button' data-testid={dataTestid} {role} {disabled} {style} on:click={onClick && onClick()}>
  <slot>{text || 'Button'}</slot>
</button>


<style lang='scss' scoped>
  button{
    outline: none;
    border: none;
    width: 100%;
    height: 30px;    
    cursor: pointer;
    background: lightgrey;
    color: black;


    &:active{
      background: darkgrey;
    }
  }
</style>
