<script lang='ts'>
  import {getContext} from 'svelte';
  import FullImage from '@images/FullImage.svelte';
  import ColorText from '@base/ColorText.svelte';
  import Button from '@base/Button.svelte'
  import Rating from '@form/Rating.svelte'
    
  export let shadow = false;
  export let innerShadow = false;
  export let rounded = false;
  export let useGradiant = false;
  export let showRating = false;
  export let showRibbon = false;
  export let noEdges = false;
  export let showAddToCart = false;
  export let showMoreInfo = false;
  
  export let orientation = 'horizontal'
  export let type = 'black'
  export let carouselType = 'standard'
  export let applyTheme = 'primary';
  export let currencyType = '$'
  export let rating = 0;
  export let maxRating = 5;

  export let name = ''
  export let description = ''
  export let price = ''  
  export let ribbonText = ''
  export let ribbonPlacement = 'left'  
  export let imageSrc = null; 
  export let bgSrc = null;
  export let links = []
  
  export let onNameClick = null;
  export let onShoppingCartClick = null;
  export let onMoreInfoClick = null;


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

  $: isCompact = cardSize() === 'tiny' || orientation === 'vertical'
  
</script>

<div class={`product-card ${type}-theme ${cardSize()} ${applyTheme}${useGradiant ? '-gradiant' : ''}`} class:rounded={rounded} class:shadow={shadow} bind:clientWidth={cardWidth}>
  
  {#if !noEdges}
    <div class='header' class:innerShadow={innerShadow} />
  {/if}

  {#if showRibbon}
    <div class="ribbon ribbon-top-{ribbonPlacement}">
      <span>{ribbonText}</span>
    </div>
  {/if}

  <!-- <div class="ribbon ribbon-top-right"><span>ribbon</span></div> -->

  <div class='body' class:compact={isCompact}>
    <section style='width: 200px; height: auto'>
      <div class='image'>
        <FullImage src='https://picsum.photos/200/300' />
      </div>
    </section>

    <section style='flex: 1 1 auto; text-align: center' class:compact={isCompact}>
      <h2 class='product-name' class:clickable={!!onNameClick} on:click={() => {onNameClick && onNameClick(name)}}>
        {name}
      </h2>  

      <p class='description'>{description}</p>
      
      <ColorText {applyTheme}>
        <p class='price'>{currencyType}{price}</p>
      </ColorText>

      {#if showRating}
        <div class='rating-container'>
          <Rating {applyTheme} emptyIcon='star-full' fullIcon='star-empty' value={rating} maxLength={maxRating} locked exactfit/> 
        </div>   
      {/if}

      {#if showAddToCart || showMoreInfo}
        <div class='button-container'>
          {#if showAddToCart}
            <Button {applyTheme} rounded exactfit fullOnMobile onClick={() => {onShoppingCartClick && onShoppingCartClick()}}>Add to cart</Button>
          {/if}
          {#if showMoreInfo}
            <Button {applyTheme} hollow rounded exactfit fullOnMobile onClick={() => {onMoreInfoClick && onMoreInfoClick()}}>More info</Button>        
          {/if}
        </div>
      {/if}
    </section>       

  </div>

  {#if !noEdges}
    <div class='footer' class:innerShadow={innerShadow} />
  {/if}


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
    position: relative;
    border: none;
    outline: none;
    
    .clickable{
      cursor: pointer
    }

    .header, .footer{
      width: 100%;
      height: 30px;      
      &.innerShadow{
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.50);  
      }
    }

    .body{
      width: calc(100% - 40px);
      display: flex;
      flex-direction: row;    
      justify-content: center;
      align-items: center;
      padding: 20px;
      column-gap: 20px;
      row-gap: 10px;

      &.compact{
        flex-direction: column;
      }
    }

    section{
      &.compact{
        text-align: center
      }
    }

    .product-name{
      font-size: 30px;
      padding: 0;
      margin-bottom: 10px;
      line-height: 1em;
    }

    .description{
      font-size: 12px;
      padding: 0;      
      max-width: 250px;
      text-align: justify;
      margin: auto auto 10px auto;
    }

    .price{
      font-size: 30px;
      padding: 0;
      margin: 10px 0;      
    }

    .rating-container{      
      display: flex;
      justify-content: center;          
    }

    .button-container{
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;
    }

    .image{
      height: 250px;
      width: 100%;
      max-width: 250px;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }

    .button-container{
      button{
        cursor: pointer;
        border: none;
        background: none;
        width: 100%;
        height: 40px;
      }
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
    

    .ribbon::before,
    .ribbon::after {
      position: absolute;
      z-index: -1;
      content: '';
      display: block;
    }

    .ribbon span {
      position: absolute;
      display: block;
      width: 200px;
      padding: 5px 0;      
      // box-shadow: 0 5px 10px rgba(0,0,0,.35);
      text-align: center;
    }

    /* top left*/
    .ribbon-top-left {
      top: -10px;
      left: -10px;
    }
    .ribbon-top-left::before,
    .ribbon-top-left::after {
      border-top-color: transparent;
      border-left-color: transparent;
    }
    .ribbon-top-left::before {
      top: 0;
      right: 0;
    }
    .ribbon-top-left::after {
      bottom: 0;
      left: 0;
    }
    .ribbon-top-left span {
      left: -60px;
      top: 30px;
      transform: rotate(-45deg);
    }

    /* top right*/
    .ribbon-top-right {
      top: -10px;
      right: -10px;
    }
    .ribbon-top-right::before,
    .ribbon-top-right::after {
      border-top-color: transparent;
      border-right-color: transparent;
    }
    .ribbon-top-right::before {
      top: 0;
      left: 0;
    }
    .ribbon-top-right::after {
      bottom: 0;
      right: 0;
    }
    .ribbon-top-right span {
      right: -60px;
      top: 30px;
      transform: rotate(45deg);
    }




    $themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger';
    @each $theme in $themes {
      &.#{$theme}{
        .header, .footer{
          background: var(--#{$theme}-5);
          color: var(--#{$theme}-5-text);          
        }

        .ribbon span{
          background: var(--#{$theme}-3);
          color: var(--#{$theme}-3-text);                    
        }
      }
    }

    $themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger';
    @each $theme in $themes {
      &.#{$theme}-gradiant{
        .header, .footer{
          background: linear-gradient(var(--#{$theme}-5), var(--#{$theme}-6));
          color: var(--#{$theme}-5-text);          
        }

        .ribbon span{
          background: var(--#{$theme}-3);
          color: var(--#{$theme}-3-text);                    
        }        
        
      }
    }

    
  }
</style>