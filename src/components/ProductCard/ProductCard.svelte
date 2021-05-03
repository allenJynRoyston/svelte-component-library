<script>
  export let style = null;
  export let imgsrc = 'https://picsum.photos/200/200';
  export let name = 'Product'
  export let description = 'Description'
  export let price = 'Price'
  export let infoText = 'More'
  export let purchaseText = 'Buy';
  export let index = null;
  export let onInfoBtn = () => {}
  export let onPurchaseBtn = () => {}

  import FullImage from '../Image/FullImage'
  import TwoSlot from '../TwoSlot/TwoSlot'
  import Button from '../Button/Button'
</script>

<div class='product-card' {style}>
  <div class='image' on:click={() => {onInfoBtn(index)}} >
    <div class='price'>
      <h2>{name}</h2>
      <p>{description}</p>     
    </div>
    <FullImage src={imgsrc} alt={name} />
  </div>
  <div class='description'>
    <TwoSlot showRight showLeft>
      <h3>${price}</h3>   
     
      <div class='buttons' slot='right'>
        <Button onClick={() => {onInfoBtn(index)}} >{infoText}</Button>
        <Button onClick={() => {onPurchaseBtn(index)}} >{purchaseText}</Button>
      </div>
    </TwoSlot>
  </div>
</div>

<style lang='scss' scoped>
  .product-card{
    width: 100%;
    height: 100%;
    color: black;
    background: slateblue;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;

    .image{
      width: 100%;
      flex: 1 1 auto;
      cursor: pointer;
      position: relative;

      .price{
        width: calc(100% - 20px);
        padding: 0 10px;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        right: 0;
        color: white;
      }
    }

    .description{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }

    .buttons{
      display: flex;
      gap: 5px;
    }
  }
</style>