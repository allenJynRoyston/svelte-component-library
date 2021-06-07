<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';
  import ProductCard from '@cards/ProductCard.svelte'
  import {DeviceStore} from '@store/store';

  const {isMobile} = DeviceStore;

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  let eventLog = []
  const events = {
    onClick: (val) => {      
      eventLog = [...eventLog, {action: 'onClick', val}]
    } 
  }

  const snippet = {
    name: 'ProductCard',
    importName: '@cards/ProductCard.svelte',
    props:{
      shadow: false,
      innerShadow: true,
      rounded: false,
      useGradiant: false,
      showRating: true,
      showRibbon: true,
      noEdges: false,
      showAddToCart: true,
      showMoreInfo: true
    },
    dropdowns: [
      {
        label: 'orientation',
        options: ['horizontal', 'vertical'], 
        value: 0        
      },        
      {
        label: 'type',
        options: ['light', 'dark'], 
        value: 0        
      },                    
      {
        label: 'applyTheme',
        options: ['primary', 'secondary', 'magic', 'success', 'warning', 'danger'], 
        value: 0        
      }, 
      {
        label: 'carouselType',
        options: ['standard'], 
        value: 0        
      },   
      {
        label: 'ribbonPlacement',
        options: ['left', 'right'], 
        value: 0        
      },         
      {
        label: 'currencyType',
        options: ['$', '€', '£', '¥'], 
        value: 0        
      },             
    ],
    inputs: [
      {forprop: 'name', renderAs: 'input', componentprop: {type: 'text'}, value: 'Product Name' },
      {forprop: 'description', renderAs: 'input', componentprop: {type: 'text'}, value: 'I am the product description and I should usually be around 20-100 words.  More then that and people stop reading.' },
      {forprop: 'price', renderAs: 'input', componentprop: {type: 'text'}, value: '99.99' },
      {forprop: 'ribbonText', renderAs: 'input', componentprop: {type: 'text'}, value: 'New!' },
      {forprop: 'rating', renderAs: 'input', componentprop: {type: 'number', max: 10}, value: 3 },
      {forprop: 'maxRating', renderAs: 'input', componentprop: {type: 'number', max: 10}, value: 5 },            
      {forprop: 'imageSrc', renderAs: 'input', componentprop: {type: 'text'}, value: 'https://picsum.photos/id/10/200/300' },
    ]          
  }

  $: livecode = `    
    <ProductCard${propstr}${selectstr}${inputstr}/>
     `

  const staticprops = {
    links: [
      {icon: 'facebook', href: '/facebook'},
      {icon: 'instagram', href: '/instagram'},
      {icon: 'email', href: '/email'},
      {icon: 'whatsapp', href: '/whatsapp'}
    ]
  }     

</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
    <div slot='liveexample'>    
      <ProductCard {...staticprops} {...props} {...selectprops} {...inputprops} {...events}/>
      {#if !$isMobile}
      <div style='display: flex; gap: 10px; margin-top: 20px;'>
        <ProductCard {...staticprops} {...props} {...selectprops} {...inputprops} {...events}/>    
        <ProductCard {...staticprops} {...props} {...selectprops} {...inputprops} {...events}/>    
      </div>    
    {/if}      
   </div>    
</LibrarySnippet>



