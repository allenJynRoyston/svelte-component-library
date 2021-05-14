<script lang='ts'>
  //--------------------------- IMPORTS  
  import {onMount, getContext} from 'svelte';
  import SVG from '../SVG/SVG.svelte'
  export let items = []
  export let onClick = (index) => {};
  //---------------------------

  const colors:any = getContext('colors');
  const theme:string = getContext('theme');

  let isDark = theme === 'dark';
  let ele;

  let renderItems = [...items]

  const header = [
    {title: 'Actions', align: 'left', applyClass: 'medium'},
    {title: 'Name', align: 'left', applyClass: 'auto'}, 
    {title: 'Price', align: 'center', applyClass: 'medium'},
    {title: 'Quantity', align: 'center', applyClass: 'medium'},        
    {title: 'Total', align: 'right', applyClass: 'medium'},        
  ]

  const deleteItem = (index) => {
    renderItems = renderItems.filter((items, i) => index !== i)    
  }

  const returnAlign = (index) => {
    const alignment = header[index].align
    return `text-align: ${alignment}`
  }

  const returnClass = (index) => {
    return header[index].applyClass
  }

  $: returnTotal = () => {
    let total = 0
    renderItems.forEach(x => {
      const {price, quantity} = x
      total += Number(price) * Number(quantity)
    })
    return total
  }
 
</script>

{#if renderItems.length > 0}
  <table class={`root-component shopping-cart`} bind:this={ele}>
    <tbody>
      <tr class='table-header'>
        {#each header as {title, align, applyClass}}
          <th class={applyClass} style={`text-align: ${align}`}>{title}</th>
        {/each}      
      </tr>

      {#each renderItems as {name, price, quantity}, index}
        <tr>
          <td class={`${returnClass(0)}`} style={`${returnAlign(0)}`} >
            <button on:click={() => {deleteItem(index)}}>
              <SVG icon='bin' fill={!isDark ? colors.black[0].color : colors.white[0].color} />
            </button>          
          </td>        
          <td class={`${returnClass(1)}`} style={`${returnAlign(1)}`}>
            <button on:click={() => {onClick(index)}}>
              {name}
            </button>
          </td>
          <td class={`${returnClass(2)}`} style={`${returnAlign(2)}`}>{price}</td>
          <td class={`${returnClass(3)}`} style={`${returnAlign(3)}; width: 50px`}>{quantity}</td>
          <td class={`${returnClass(4)}`} style={`${returnAlign(4)}; width: 100px`}>{(Number(price) * Number(quantity)).toFixed(2)}</td>
        </tr>
      {/each}   
    </tbody>
  </table>

  <div class='shopping-cart-total' >
    <p>Grand Total: <span class='grand-total'>{returnTotal()}</span></p>
  </div>
{:else}
  <p>Nothing in shopping cart.</p>
{/if}

<style lang='scss' scoped>
  .shopping-cart{        
    width: calc(100% - 20px);
    padding: 10px;
    color: var(--white-0-text);

    &.dark-theme{
      color: var(--black-1-text);      
    }

    .small{
      width: 50px;
    }

    .medium{
      width: 75px;
    }

    .large{
      width: 100px;
    }    

    .table-header{
      border-bottom: 1px solid grey;
      margin-bottom: 20px;
    }

    button{            
      cursor: pointer;
      padding: 10px 0;
      background: none;
      border: none;
      outline: none;
      color: inherit;
    }
  }  
  
  .shopping-cart-total{
    text-align: right;
    margin-top: 20px;
  }

  .grand-total{
    font-weight: 700;
    margin-left: 10px;
  }
</style>

