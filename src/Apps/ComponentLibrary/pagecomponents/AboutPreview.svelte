<script lang='ts'>
  import {getContext} from 'svelte';

  import Footer from '@components/Footer/Footer.svelte'
  import Container from '@components/Container/Container.svelte'
  import Section from '@components/Section/Section.svelte'
  import Button from '@components/Button/Button.svelte'
  import ColorText from '@components/ColorText/ColorText.svelte'
  import ThemeWrapper from '@components/ThemeWrapper/ThemeWrapper.svelte'
  import Link from '@components/Link/Link.svelte'
  import CodeBlock from '@components/CodeBlock/CodeBlock.svelte'

  const theme:string = getContext('theme');

</script>


<ThemeWrapper alwaysdark={theme === 'dark'} alwayslight={theme === 'light'}>
  <Container offset={2}>
    <Section>
      <section class='section-wrap'>
        <h2 class='about-title'>
          What is Svelte-Tip?
        </h2>
        <p>
          Svelte-Tip is a rapid development boilerplate project built using the 
          <ColorText type='secondary' bold><Link target="_blank" href='https://svelte.dev/' inherit>Svelte</Link></ColorText> framework and 
          <ColorText type='magic' bold><Link target="_blank" href='https://www.snowpack.dev/' inherit>Snowpack</Link></ColorText> build tool.            
          Svelte-Tip takes advantage of both of these amazing technologies to specialize on ease of use, tiny compile size, and component centric development that makes building 
          large apps just as seamless as small ones.  Regardless of the size or complexity of your SPA project, you'll find that Svelte-Tip recompiles
          almost instantly saving you, the developer, countless little pockets of time that would be wasted waiting for a full recompile.          
        </p>
        <p>
          When your ready, projects are bundled via <ColorText type='warning' bold><Link target="_blank" href='https://www.snowpack.dev/' inherit>Rollup</Link></ColorText> for the smallest possible size (although Webpack and Parcel configurations are available too).
        </p>
      </section> 
    </Section>
  </Container>
</ThemeWrapper>

<ThemeWrapper alwaysdark={theme === 'light'} alwayslight={theme === 'dark'}>
  <Container offset={2}>
    <Section>
      <section class='section-wrap'>
        <h2 class='about-title'>
          Ease Of Use
        </h2>
        <p>
          The Svelte-Tip library comes with several pre-made components designed specifically to give you the ability to create a new web app quickly.  Each component has been built with a mobile-first philsophy to ensure they work just as well on mobile as they do on a desktop, and can 
          be extended with new functionality easily.         
        </p>
        <p>
          New things will be added to the Svelte-Tip library over time, so check back often to see if there's a component you can use for your project!
        </p>        
      </section> 
    </Section>
  </Container>
</ThemeWrapper>

<ThemeWrapper alwaysdark={theme === 'dark'} alwayslight={theme === 'light'}>
  <Container offset={2}>
    <Section>
      <section class='section-wrap'>
        <h2 class='about-title'>
          Optimized for Production
        </h2>
        <p>
          Everything about Svelte-Tip is about production optimization.  When you're ready to go, a simple:  
          <CodeBlock nowrap snippet={`            
  $npm run build
          `} />
          
          
          ... and your app will be bundled, images optimized, and everything ready to go without any messy configurations.  
          And because this is <ColorText type='secondary' bold><Link target="_blank" href='https://svelte.dev/' inherit>Svelte</Link></ColorText> the compiled size is going to be vastly smaller then it's React or Vue counterparts.          
        </p>     
      </section> 
    </Section>
  </Container>
</ThemeWrapper>

<ThemeWrapper alwaysdark={theme === 'light'} alwayslight={theme === 'dark'}>
  <Container offset={2}>
    <Section>
      <section class='section-wrap'>
        <h2 class='about-title'>
          Svelte-Tip is Non-opinionated (kinda)
        </h2>
        <p>
          Do you like Typescript?  Great, you can use it if you want.  SCSS or SASS?  Less or Stylus?  Build components how you want to bulid them.  
          While there is a recommended structure Svelte-tip prefers for it's root app, nothing says you have to use it.  Or any of it.  It's as non-commital 
          as your last failed relationship, presumably.            
        </p>    
        <p>
          Everything in Svelte-Tip is meant to be easily customizable, including the colors, typography and component styles.  
          In fact, this entire site is built using only the components in the Svelte-Tip library!
        </p>            
      </section> 
    </Section>
  </Container>
</ThemeWrapper>


<ThemeWrapper alwaysdark={theme === 'dark'} alwayslight={theme === 'light'}>
  <Container offset={2}>
    <Section>
      <section class='section-wrap'>
        <h2 class='about-title'>
          Try it out now
        </h2>
        <p>
          Svelte-Tip is working towards a 1.0 release soon, but feel free to check it out now!            
        </p>        
        <div style='max-width: 200px; margin: auto'>
          <Button href='https://github.com/allenRoyston/svelte-component-library' target="_blank" type={theme ==='light' ? 'magic' : 'primary'} hollow rounded>Github</Button>  
        </div>    
      </section> 
    </Section>
  </Container>
</ThemeWrapper>


<ThemeWrapper alwaysdark={theme === 'light'} alwayslight={theme === 'dark'}>
  <Container offset={2}>
    <Section>
      <section class='section-wrap'>
        <h2 class='about-title'>
          Built using Svelte-Tip!
        </h2>
        <p>
          Nothing yet, but let's try and change that around shall we!           
        </p>                
      </section> 
    </Section>
  </Container>
</ThemeWrapper>

<Footer />



<style lang='scss'>

  .about-title{
    font-size: 32px;
  }

</style>