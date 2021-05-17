<script lang='ts'>
    import {getContext} from 'svelte';
    import {createChannel} from '../../../js/utility'  
    
    import Container from '@components/Container/Container.svelte';
    import Header from '@components/Header/Header.svelte'
    import ThemeWrapper from '@components/ThemeWrapper/ThemeWrapper.svelte'
    import Channels from '@components/Channels/Channels.svelte'
    import Section from '@components/Section/Section.svelte'
    import HashWatch from '@components/URLWatcher/HashWatch.svelte'
  
    export let headerprops;
  
    const headercopy:any = {...headerprops}
    if(!!headercopy?.notchEle){
      headercopy.notchEle.show = false;
      headercopy.notchEle.props = {
        showSidebarButton: false
      }
    }
  
    const theme:string = getContext('theme');
    const rootUrl = `#components?page=home&section=`
    
  //---------------------------  
  let themeWatch = true;
  const hashWatch = ({params}) => {
    const index = channel.data.findIndex(data => {
      return data?.id.toLowerCase() === params?.section
    }) 
    channel.current = index < 0 ? 0 : index
    themeWatch = false;
    setTimeout(() => {
      themeWatch = true;
    })    
  }
  //---------------------------  
  
  </script>
  

  <ThemeWrapper {theme} {themeWatch} lock>
      <Container offset={theme === 'dark' ? 2 : 0}>

        <Header {...headercopy} />



          <Section style='height: 100vh'>
            <section class='section-wrap'>
              <h2>
                Sorry, this is currently unavailable!
              </h2>
              <p>
                But will be updated soon!
              </p>        
         
            </section> 
          </Section>

      </Container>
  </ThemeWrapper>
  
  <style lang='scss'>
    .home-page{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  
    .home-section{    
      width: 100%;
    }
  
  
    .button-nav{
      display: flex;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);  
    }
  
  </style>
    