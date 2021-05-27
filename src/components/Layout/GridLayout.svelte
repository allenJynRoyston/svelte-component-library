<script lang='ts'>
  import {getContext} from 'svelte'
  import LoremBlock from '../LoremBlock/LoremBlock.svelte'
  
  export let size:number = 150;
  export let gap:number = 10;

  export let outline:boolean = false;
  export let items:any = [{component: LoremBlock, row: 2, column: 2}, {component: LoremBlock}, {component: LoremBlock}]

  const theme:string = getContext('theme');

  $: style = () => {    
    return `grid-auto-rows: ${size}px; grid-template-columns: repeat(auto-fill, minmax(${size}px, 1fr)); grid-gap: ${gap}px`
  }

</script>

<ul class='grid-layout' style={style()}>
  {#each items as {component, row, column, onClick, props}, index}
    <li class={`grid-item ${theme}-theme`}
        class:row-two={row && row === 2} 
        class:row-three={row && row === 3}     
        class:column-two={column && column === 2} 
        class:column-three={column && column === 3} 
        class:outline={outline}>
        <svelte:component this={component} {...props} {index} />
    </li>
  {/each}
</ul>

<style lang='scss'>
 @import "../../scss/src/_media-queries.scss";

.grid-layout {
  padding: 0;
  margin: 0;
	// Flexbox Default/Fallback - does not produce 100% matching result 
	display: flex;
	flex-wrap: wrap;
	// Use Grid if browser supports it
	display: grid;
}

.grid-item{
  flex: 0 0 auto;
  flex-wrap: wrap;
  height: 20vh;
  margin: .12rem;
  width: 20rem;
  min-width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &.outline{
    outline: 2px solid var(--black-1);
  }  

  &.dark-theme{
    &.outline{
      outline: 2px solid var(--white-0);
    }  
  }



  @supports ( display: grid ) {
    //unset the propertied used for flexbox fallback
    height: initial;
    margin: unset;
    width: initial;
    min-width: initial;

    @include desktop-and-up{
      &.column-two{
        grid-column: span 2;
      }

      &.column-three{
        grid-column: span 2;
      }      
    }        
    
    &.row-two{
        grid-row: span 2;
      }

      &.row-three{
        grid-row: span 2;
      }        
  }
}

</style>