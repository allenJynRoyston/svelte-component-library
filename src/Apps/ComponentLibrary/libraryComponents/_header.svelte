<script lang='ts'>
  import {getContext} from 'svelte'
  import Button from '@components/Button/Button.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import LibraryBlock from '../components/LibraryBlock.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  import Header from '@components/Header/Header.svelte'
  import NavBar from '@components/NavBar/NavBar.svelte';
  import Splash from '@components/Splash/Splash.svelte'
  import ThemeSwitch from '@components/ThemeSwitch/ThemeSwitch.svelte';
  import Search from '@components/Search/Search.svelte';

  let props = {
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


</script>

<TwoSlot showLeft showRight>
  <h2>Header</h2>
  <div slot='right' style='display: flex; gap 10px'>
  </div>
</TwoSlot>
<hr>

<CodeBlock open title='Import:' snippet={`
  import Header from '@components/Header/Header.svelte'
  `} />

<CodeBlock title='Properties:' snippet={`
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

  `} />

<LibraryBlock title="Default:">
  <Header {...props} >

  </Header>
</LibraryBlock>


<CodeBlock open title='Example:' snippet={`
  let props = {
    bgSrc: 'https://picsum.photos/id/10/1440/600',
    logoSrc: './logo/logo.png',
    navEle: {
      component: NavBar,
      props: {
        links: [
          {title: 'Home', icon: 'icon', href: '#components?component=header&link=home'},
          {title: 'About', icon: 'icon', href: '#components?component=header&link=about'},
          {title: 'Contact', icon: 'icon', href: '#components?component=header&link=contact'}
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
    },    
    notchEle: {
      component: Search,
      show: false,
      props:{
        title: 'I '
      }
    },     
  }

  <Header >
    <Header {...props} >
      <h1>
        Header Name
      </h1>
    </Header>
  </Header>
  `} />  



<LibraryBlock title="Show Center:">
  <Header {...props} showCenter>

  </Header>
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  <Header >
    <Header {...props} showCenter >
      <h1>
        Header Name
      </h1>
    </Header>
  </Header>
  `} />  

<LibraryBlock title="Show Footer:">
  <Header {...props} showFooter>

  </Header>
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  <Header >
    <Header {...props} showCenter >
      <h1>
        Header Name
      </h1>
    </Header>
  </Header>
  `} />  



<LibraryBlock title="Notch Component:">
  <Header {...props}  {notchEle} >

  </Header>
</LibraryBlock>

<CodeBlock open title='Example:' snippet={`
  import Search from '@components/Search/Search.svelte';

  const notchEle = {
    component: Search,
    show: false,
    props:{
      title: 'I '
    }
  }

  <Header >
    <Header {...props} {notchEle} showCenter >
      <h1>
        Header Name
      </h1>
    </Header>
  </Header>
  `} />  

