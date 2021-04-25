<script>
  export let style = ''
</script>

<pre style={style}>
  <code>
    <slot />
  </code>
</pre>

<style lang='scss' scoped>
/* CSS Simple Pre Code */
pre {
    background: #333;
    color: white;
    white-space: pre;
    word-wrap: break-word;
    overflow: auto;
    padding: 10px;
}
</style>
