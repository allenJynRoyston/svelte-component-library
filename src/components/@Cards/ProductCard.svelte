<script lang='ts'>
  import {getContext} from 'svelte';
  import FullImage from '@images/FullImage.svelte';
  import LoremBlock from '@base/LoremBlock.svelte'
  import InnerContainer from '@base/InnerContainer.svelte'
  import SVG from '@base/SVG.svelte'
  import ColorText from '@base/ColorText.svelte';
  import Button from '@base/Button.svelte'
  import Rating from '@form/Rating.svelte'
    
  export let shadow = false;
  export let innerShadow = false;
  export let rounded = false;
  export let useGradiant = false;
  
  export let orientation = 'vertical'
  export let type = 'black'
  export let imageType = 'rounded'
  export let applyTheme = 'primary';

  export let name = 'name'
  export let title = 'title'
  export let profession = 'profession'  
  export let imageSrc = null; 
  export let bgSrc = null;
  export let links = []
  

  const theme:string = getContext('theme')

  let cardWidth = null;
  let contentHeight = null;
  let height = null;  

  const setHeight = () => {
    if(height === null){
      height = contentHeight;
    }
  }

  $: cardSize = () => {
    if( cardWidth >= 720 ){
      return 'large'
    }
    if( cardWidth < 720 && cardWidth > 640 ){
      return 'medium'
    }
    if( cardWidth < 640 && cardWidth > 420  ){
      return 'small'
    }
    if( cardWidth < 420  ){
      return 'tiny'
    }    
  }

  $: iconSize = () => {
    if( cardWidth < 720  ){
      return 18
    }    
    else{
      return 14
    }
  }  
  

  $ : {
    contentHeight !== null && setHeight()
  }
  
</script>

<div class={`product-card ${type}-theme ${cardSize()} ${orientation} ${applyTheme}${useGradiant ? '-gradiant' : ''}`} class:rounded={rounded} class:shadow={shadow} bind:clientWidth={cardWidth}>
  
  <div class='body'>

    <div class='image'>
      <FullImage src='https://picsum.photos/200/300' />
    </div>

    <h2 class='product-name'>
      Product Name
    </h2>


    <p class='description'>A small description regarding the product above</p>

    <ColorText {applyTheme}>
      <p class='price'>$99</p>
    </ColorText>

    <div class='rating-container'>
      <Rating {applyTheme} emptyIcon='star-full' fullIcon='star-empty' value={3} maxLength={5} /> 
    </div>          


  </div>

  <div class='button-container'>
    <Button {useGradiant} {applyTheme} nomargin full size='large' >Add to cart</Button>
  </div>

 
</div>

<style lang='scss'>
  @import "../../scss/src/_media-queries.scss";

  .product-card{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;    
    overflow: hidden;
    background: var(--white-0);
    color: var(--white-0-text);   
    padding-top: 20px;


    .body{
      width: calc(100% - 40px);
      display: flex;
      flex-direction: column;    
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .product-name{
      font-size: 30px;
      padding: 0;
      margin: 0;
    }

    .description{
      font-size: 12px;
      padding: 0;
      margin: 0;      
    }

    .price{
      font-size: 30px;
      padding: 0;
      margin: 10px 0;      
    }

    

    .rating-container{
      width: auto;
    }

    .image{
      height: 250px;
      width: 100%;
      max-width: 250px;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }

    &.rounded{
      border-radius: 10px;
    }

    &.shadow{
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.50);  
    }

    &.dark-theme{
      background: var(--black-1);
      color: var(--black-1-text);
    }       
    


    // $themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger';
    // @each $theme in $themes {
    //   &.#{$theme}{
        
      
    //   }
    // }

    $themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger';
    @each $theme in $themes {
      &.#{$theme}-gradiant{
        
      
      }
    }

    
  }
</style>