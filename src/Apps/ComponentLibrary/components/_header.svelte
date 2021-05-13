<script lang='ts'>
  import Header from '../../../components/Header/Header.svelte'
  import LibraryBlock from './__LibraryBlock.svelte'
  import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte'
  import NavBar from '../../../components/NavBar/NavBar.svelte';
  import Splash from '../../../components/Splash/Splash.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'

  let propsOne = {
    logoSrc: './images/mock-logo-250x250.png',
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
    }
  }

  let propsTwo = {
    logoSrc: './images/mock-logo-250x250.png',
    bgSrc: 'https://picsum.photos/id/1002/1440/600',
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
    }
  }  

</script>

<h2>Header</h2>
<hr>


<LibraryBlock title="Default:">
  <Header {...propsTwo} >
    <h1>
      Header Name
    </h1>
  </Header>
</LibraryBlock>

<ThemeWrapper theme='light' delay={1} lock>
  <LibraryBlock title="Light Theme:">
    <Header {...propsTwo} expand>
      <h1>
        Header Name
      </h1>
    </Header>
  </LibraryBlock>
</ThemeWrapper>

<ThemeWrapper theme='dark' delay={1} lock>
  <LibraryBlock title="Dark Theme:">
    <Header {...propsOne} expand>
      <h1>
        Header Name
      </h1>
    </Header>
  </LibraryBlock>
</ThemeWrapper>


<CodeBlock title='Properties:' snippet={`
  export let logoSrc = null;
  export let bgSrc = null;
  export let logoLink = '/';

  export let navEle = null;
  export let centerEle = null;  
  export let expand = false;

`} />

<CodeBlock open title='Example:' snippet={`
  let props = {
    bgSrc: 'https://picsum.photos/id/10/1440/600',
    logoSrc: './images/mock-logo-250x250.png',
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
    }
  }

  <Header >
    <Header {...props} expand >
      <h1>
        Header Name
      </h1>
    </Header>
  </Header>
`} />  


