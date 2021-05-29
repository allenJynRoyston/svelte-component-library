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
    props: {
      showBurgerMenuButton: true,
      invertColors: false,
      showHero: true,
      showFooter: true,
      showNotch: true,
      hideTitle: false,
      hideLogo: false,
      hideNav: false
    },
    inputs: [
      {forprop: 'title', renderAs: 'input', componentprop: {type: 'text'}, value: 'Title' },
      {forprop: 'logoSrc', renderAs: 'input', componentprop: {type: 'text'}, value: 'https://picsum.photos/id/10/20/20' },
      {forprop: 'bgSrc', renderAs: 'input', componentprop: {type: 'text'}, value: 'https://picsum.photos/id/10/1440/600' }
    ]        
  }

  let staticprops = {
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
    heroEle: {
      component: Splash,
      props: {
        buttonOne: {
          text: 'Info',
          applyTheme: 'black',
          href: '#components?component=header&link=cta1',
          size: 'large',
          rounded: true,     
        },
        buttonTwo: {
          text: 'Purchase',
          applyTheme: 'white',
          href: '#components?component=header&link=cta2',
          size: 'large',
          hollow: true,
          rounded: true,          
        }        
      }
    },
    footerEle: {
      component: ThemeSwitch
    },
    notchEle:  {
      component: Search,
      show: true,
    }    
  }

  $: livecode = ` 
    import NavBar from '@components/NavBar/NavBar.svelte'
    import Splash from '@components/Splash/Splash.svelte'
    import ThemeSwitch from '@components/ThemeSwitch/ThemeSwitch.svelte'
    import Search from '@components/Search/Search.svelte'

    let headerprops = {
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
      heroEle: {
        component: Splash,
        props: {
          buttonOne: {
            text: 'Info',
            type: 'hollow',
            applyTheme: 'black',
            href: '#components?component=header&link=cta1',
            size: 'large',
            rounded: true,     
          },
          buttonTwo: {
            text: 'Purchase',
            applyTheme: 'white',
            href: '#components?component=header&link=cta2',
            size: 'large',
            hollow: true,
            rounded: true,          
          }        
        }
      },
      footerEle: {
        component: ThemeSwitch
      },
      notchEle:  {
        component: Search,
        show: true,
      }     
    }
      
    <Header {...headerprops} ${propstr}${selectstr}${inputstr}/> 
     `  


</script>

<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    
    <Header {...staticprops} {...props} {...selectprops} {...inputprops} />  
   </div>    

</LibrarySnippet>

