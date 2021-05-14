<script lang='ts'>
  import {getContext} from 'svelte';
  import {createChannel} from '../../../js/utility'  
  import Container from '../../../components/Container/Container.svelte';
  import InnerContainer from '../../../components/InnerContainer/InnerContainer.svelte'
  import Header from '../../../components/Header/Header.svelte'
  import ThemeWrapper from '../../../components/ThemeWrapper/ThemeWrapper.svelte'
  import Channels from '../../../components/Channels/Channels.svelte'
  import Button from '../../../components/Button/Button.svelte'

  import ColorPreview from '../pagecomponents/ColorPreview.svelte'
  import TypographyPreview from '../pagecomponents/TypographyPreview.svelte'

  export let headerprops;

  const theme:string = getContext('theme');

  //--------------------------- CHANNEL
  const channel = createChannel({
     current: 0,
     data: [
        {content: ColorPreview},
        {content: TypographyPreview},
        {content: ColorPreview},
    ]
  }) 
  //---------------------------   

</script>

<ThemeWrapper {theme} delay={1} lock>
    <Container>
      <InnerContainer>

        <div class='home-page'>
          <Header {...headerprops} showCenter showFooter bgSrc={`https://picsum.photos/id/${theme === 'dark' ? '1082' : '1001'}/1440/600`}>
            <h1>Svelte Component Library</h1>
          </Header>

          <div class='home-section'>
            <div class='button-nav'>
              <Button type='primary' onClick={() => {channel.current = 0}}>Colors</Button>
              <Button type='secondary' onClick={() => {channel.current = 1}}>Typgraphy</Button>
              <Button type='success' onClick={() => {channel.current = 2}}>Utility</Button>
            </div>
            
            <Channels nopadding animate {...channel} />              
          </div>
        </div>

      </InnerContainer>
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
  