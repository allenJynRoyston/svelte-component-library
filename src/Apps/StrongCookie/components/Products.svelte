<script>
  import ProductCard from '../../../components/ProductCard/ProductCard'

  const onClick = (index) => {
    const parts = window.location.hash.split('&product=')
    window.location.hash = `${parts[0]}&product=${index}`
  }
</script>

<div class='products'>
  <ProductCard index={1} onClick={onClick} />
  <ProductCard index={2} onClick={onClick} />
  <ProductCard index={3} onClick={onClick} />
  <ProductCard index={3} onClick={onClick} />
</div>


<style lang='scss' scoped>
  .products{
    display: flex;
    gap: 10px;
  }
</style>
