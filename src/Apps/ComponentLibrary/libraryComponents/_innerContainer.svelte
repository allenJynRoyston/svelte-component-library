<script lant='ts'>  
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import LoremBlock from '@base/LoremBlock.svelte'
  import InnerContainer from '@base/InnerContainer.svelte'

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;

  const snippet = {
    name: 'InnerContainer',
    importName: '@base/InnerContainer.svelte',
    props: {
      accountForTopPos: false,
      skinnybar: false,
      centered: false
    },     
    inputs: [
      {forprop: 'height', renderAs: 'input', componentprop: {type: 'text'}, value: '250px' },
      {forprop: 'adjustPx', renderAs: 'input', componentprop: {type: 'number'}, value: null }
    ],
    notes: [
      'AccountForTopPos should only be set to true if InnerContainer is used to wrap a main component, such as the ColumnLayout',
      'Centered is a special test case.  Normally you would use it in a modal.'
    ]       
  }

  $: livecode = `    
    <InnerContainer ${propstr}${selectstr}${inputstr}>
      <section>
        <strong>
          Automatically applies a scrollbar if wrapped in a container that is too small for the content.
          Can set the height manually if you want finer control over how much scroll is available.
        </strong>
        <LoremBlock />
        <LoremBlock />
        <LoremBlock />
      </section>
    </InnerContainer>
     `


</script>

<LibrarySnippet {...snippet} {livecode}bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <InnerContainer {...props} {...selectprops}{...inputprops}>
      <section>
        <strong>
          Automatically applies a scrollbar if wrapped in a container that is too small for the content.
          Can set the height manually if you want finer control over how much scroll is available.
        </strong>
        <LoremBlock />
        <LoremBlock />
        <LoremBlock />
      </section>
    </InnerContainer>
  </div>    
</LibrarySnippet>


