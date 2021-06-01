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


<ThemeWrapper >
  <Container offset={2}>
    <Section>
      <section class='section-wrap'>
        <h2 class='about-title'>
          What is SvelteTip?
        </h2>
        <p>
          SvelteTip is a rapid development boilerplate project built using the 
          <ColorText applyTheme='warning'><Link target="_blank" href='https://svelte.dev/' inherit>Svelte</Link></ColorText> framework and 
          <ColorText applyTheme='magic'><Link target="_blank" href='https://www.snowpack.dev/' inherit>Snowpack</Link></ColorText> build tool.            
          SvelteTip takes advantage of both of these amazing technologies to specialize on ease of use, tiny compile size, and component centric development that makes building 
          large apps just as seamless as small ones.  Regardless of the size or complexity of your SPA project, you'll find that using SvelteTip 
          can save you - the developer - countless little pockets of time.        
        </p>
        <p>
          When your ready, projects are bundled via <ColorText applyTheme='secondary'><Link target="_blank" href='https://www.snowpack.dev/' inherit>Rollup</Link></ColorText> for the smallest possible size (although Webpack and Parcel configurations are available too).
        </p>
      </section> 
    </Section>
  </Container>
</ThemeWrapper>

<ThemeWrapper invert>
  <Container offset={2}>
    <Section>
      <section class='section-wrap'>
        <h2 class='about-title'>
          Build it Once
        </h2>
        <p>
          SvelteTip prides itself on it's growing library of useful pre-made components that have been specifically engineered to work just as well on your phone as it would your desktop.  
          The goal, ultimately, is to move towards a "just build it once" web ecosystem that avoids costly mobile app development.
          
          If you know a little bit of <ColorText applyTheme='warning'><Link target="_blank" href='https://svelte.dev/' inherit>Svelte</Link></ColorText>, functionality can be extended with ease.
        </p>
        <p>
          New things will be added to the SvelteTip library over time, so check back often to see if there's a component you can use for your project!
        </p>        
      </section> 
    </Section>
  </Container>
</ThemeWrapper>

<ThemeWrapper>
  <Container offset={2}>
    <Section>
      <section class='section-wrap'>
        <h2 class='about-title'>
          Optimized for Production
        </h2>
        <p>
          SvelteTip is built with optimization in mind, but without all the hassel that goes into it.  When you're ready to go, a simple:  
          <br><br>
          <CodeBlock nowrap snippet={`            
  $npm run build
          `} />
          
          <br>
          ... will bundle your app, optimized your images, and gets you coffee while you wait (update pending).
          And because this is <ColorText applyTheme='warning' ><Link target="_blank" href='https://svelte.dev/' inherit>Svelte</Link></ColorText>, the entire app will be compiled into pure untainted Javascript, 
          meaning a <Link target='_blank' active href='https://dev.to/hanna/why-svelte-is-revolutionary-415e'>faster and smaller app then if buit with Vue or React.</Link>
        </p>     

        <p>
          And on a personal note, while I love and adore React and Vue for their own merits, developing with <ColorText applyTheme='warning' ><Link target="_blank" href='https://svelte.dev/' inherit>Svelte</Link></ColorText> is just a much better experience.
        </p>
      </section> 
    </Section>
  </Container>
</ThemeWrapper>

<ThemeWrapper invert>
  <Container offset={2}>
    <Section>
      <section class='section-wrap'>
        <h2 class='about-title'>
          SvelteTip is Non-opinionated (kinda)
        </h2>
        <p>
          Do you like Typescript?  SCSS or SASS?  Less or Stylus?  Pug?  Awesome - me too; give me all the tools please. Build how you want to bulid.  
          While there is a recommended structure SvelteTip prefers for it's root app, nothing says you have to use it.  Or any of it.  It's as non-commital 
          as your last failed relationship (presumably).            
        </p>    
        <p>
          Everything in SvelteTip is meant to be easily customizable, including the colors, typography and component styles.  
          In fact, this entire site is built using only the components in the SvelteTip library!
        </p>            
      </section> 
    </Section>
  </Container>
</ThemeWrapper>


<ThemeWrapper>
  <Container offset={2}>
    <Section>
      <section class='section-wrap'>
        <h2 class='about-title'>
          Try it out now
        </h2>
        <p>
          SvelteTip is working towards a 1.0 release soon, but feel free to check it out now!            
        </p>        
        <div style='max-width: 200px; margin: auto'>
          <Button href='https://github.com/allenRoyston/svelte-component-library' target="_blank" applyTheme={theme ==='light' ? 'magic' : 'primary'} hollow rounded>Github</Button>  
        </div>    
      </section> 
    </Section>
  </Container>
</ThemeWrapper>


<ThemeWrapper invert >
  <Container offset={2}>
    <Section>
      <section class='section-wrap'>
        <h2 class='about-title'>
          Built using SvelteTip!
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
    font-size: 28px;
  }

</style>