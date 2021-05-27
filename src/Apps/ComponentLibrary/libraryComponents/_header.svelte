<script lang='ts'>
	import LibrarySnippet from './../components/LibrarySnippet.svelte';

  import Header from '@components/Header/Header.svelte'
  import NavBar from '@components/NavBar/NavBar.svelte';
  import Splash from '@components/Splash/Splash.svelte'
  import ThemeSwitch from '@components/ThemeSwitch/ThemeSwitch.svelte';
  import Search from '@components/Search/Search.svelte';

  let propstr = '';
  let selectstr = '';
  let inputstr = '';
  let props; 
  let selectprops;
  let inputprops;


  const snippet = {
    name: 'Header',
    importName: '@components/Header/Header.svelte',
    properties: `
    export let title = null;
    export let logoSrc = null;
    export let bgSrc = null;
    export let logoLink = '/';

    export let navEle = null;
    export let centerEle = null;  
    export let footerEle = null;
    export let notchEle = null;
    export let showCenter = false;  
    export let showFooter = false;
    export let showLayoutButton = false;

    `,
    props: {
      showCenter: true,
      showFooter: true,
      showLayoutButton: true
    }
  }

  let staticprops = {
    title: "Brand Name",
    logoSrc: './images/logo/logo.png',
    bgSrc: 'https://picsum.photos/id/10/1440/600',
    navEle: {
      component: NavBar,
      props: {
        links: [
          {title: 'Home', icon: 'icon', href: '#components?component=header&link=home', active: true},
          {title: 'About', icon: 'icon', href: '#components?component=header&link=about', active: false},
          {title: 'Contact', icon: 'icon', href: '#components?component=header&link=contact', active: false}
        ]
      }
    },
    centerEle: {
      component: Splash,
      props: {
        buttonOne: {
          text: 'Info',
          type: 'hollow',
          href: '#components?component=header&link=cta1',
          size: 'large',
          rounded: true,     
        },
        buttonTwo: {
          text: 'Purchase',
          type: 'primary',
          href: '#components?component=header&link=cta2',
          size: 'large',
          rounded: true,          
        }        
      }
    },
    footerEle: {
      component: ThemeSwitch
    }
  }

  const notchEle = {
    component: Search,
    show: true,
    props:{
      title: 'I '
    }
  }

  $: livecode = `    
    <Header ${propstr}${selectstr}${inputstr} >

    </Header>   
     `  


</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Header {...staticprops} {...props} {...selectprops}
{...inputprops} >

    </Header>    
   </div>    

</LibrarySnippet>

