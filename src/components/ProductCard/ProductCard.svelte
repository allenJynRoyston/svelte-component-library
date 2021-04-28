<script>
  export let style = null;
  export let imgsrc = 'https://picsum.photos/200/300';
  export let title = 'Product'
  export let index = null;
  export let onClick = () => {}

  import FullImage from '../Image/FullImage'
  import ThreeSlot from '../ThreeSlot/ThreeSlot'
  import Button from '../Button/Button'
</script>

<div class='product-card' {style}>
  <div class='image' on:click={() => {onClick(index)}} >
    <FullImage src={imgsrc} alt={title} />
  </div>
  <div class='description'>
    <ThreeSlot showLeft showRight>
      <div slot='left'>
        <h3>{title}</h3>
      </div>
  
      <div style='text-align: center'>
        <h3>99$</h3>
      </div>
      
      <div slot='right'>
        <Button onClick={() => {onClick(index)}} >More</Button>
      </div>
    </ThreeSlot>
  </div>
</div>

<style lang='scss' scoped>
  .product-card{
    width: 100%;
    height: 400px;
    color: black;
    background: slateblue;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    overflow: hidden;

    .image{
      width: 100%;
      height: 300px;
      cursor: pointer;
    }

    .description{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }
  }
</style>