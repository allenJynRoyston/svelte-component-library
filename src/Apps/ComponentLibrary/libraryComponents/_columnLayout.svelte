<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import ColumnLayout from '@components/Layout/ColumnLayout.svelte'
  import LoremBlock from '@components/LoremBlock/LoremBlock.svelte'

  let fullstr = '';
  let propstr = '';
  let props; 
  let selectprops; 

  const snippet = {
    name: 'ColumnLayout',
    importName: '@components/ColumnLayout/ColumnLayout.svelte',
    properties: `
    export let links = []
    export let currentIndex = null;
    export let hidebtn:boolean = false;
    export let side = 'left'
    export let disableSearch = false;
    export let watchParam = null
    export let activeTheme = 'primary'
    `,
    props: {
      hidebtn: false,
      disableSearch: false,
    }, 
    dropdowns: [
      {
        label: 'activeTheme',
        options: [null, 'primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
        value: 0        
      },
      {
        label: 'side',
        options: [null, 'left', 'right'], 
        value: 0        
      }      
    ]
  }  

  const links = [
    {title: 'Link 1', href: '#', section: 'Section 1' },    
    {title: 'Link 2', href: '#', section: 'Section 1' },    
    {title: 'Link 3', href: '#', section: 'Section 1' },    
    {title: 'Link 1', href: '#', section: 'Section 2' },    
    {title: 'Link 2', href: '#', section: 'Section 2' },    
    {title: 'Link 3', href: '#', section: 'Section 2' },    
  ]



  $: livecode = `    
    const links = [
      {title: 'Link 1', href: '#', section: 'Section 1' },    
      {title: 'Link 2', href: '#', section: 'Section 1' },    
      {title: 'Link 3', href: '#', section: 'Section 1' },    
      {title: 'Link 1', href: '#', section: 'Section 2' },    
      {title: 'Link 2', href: '#', section: 'Section 2' },    
      {title: 'Link 3', href: '#', section: 'Section 2' },    
    ]

    <ColumnLayout {links} ${fullstr}>
      <div style='padding: 0 10px'>
        <LoremBlock />
      </div>
    </ColumnLayout>
     `  



</script>

<LibrarySnippet {...snippet} {livecode} bind:fullstr={fullstr} bind:propstr={propstr} bind:props={props} bind:selectprops={selectprops} >
  <div slot='liveexample'>    
    <ColumnLayout {links} {...props} {...selectprops} ignoreForExample>
      <div style='padding: 0 10px'>
        <LoremBlock />
      </div>
    </ColumnLayout>
   </div>    


</LibrarySnippet>
