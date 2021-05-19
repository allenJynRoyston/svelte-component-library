<script lang='ts'>
  import {getContext} from 'svelte';
  import {DeviceStore} from '@store/store'
  import {createChannel} from '@js/utility'  
  
  import Container from '@components/Container/Container.svelte';
  import Header from '@components/Header/Header.svelte'
  import ThemeWrapper from '@components/ThemeWrapper/ThemeWrapper.svelte'
  import Channels from '@components/Channels/Channels.svelte'
  import Button from '@components/Button/Button.svelte'
  import HashWatch from '@components/URLWatcher/HashWatch.svelte'

  import AboutPreview from '../pagecomponents/AboutPreview.svelte'
  import ColorPreview from '../pagecomponents/ColorPreview.svelte'
  import TypographyPreview from '../pagecomponents/TypographyPreview.svelte'
  import UtilityPreview from '../pagecomponents/UtilityPreview.svelte'
  import StorePreview from '../pagecomponents/StorePreview.svelte'

  export let headerprops;

  const {isMobile} = DeviceStore;

  const headercopy:any = {...headerprops}
  if(!!headercopy?.notchEle){
    headercopy.notchEle.show = false;
  }

  const theme:string = getContext('theme');
  const rootUrl = `#components?page=home&section=`
  
  //--------------------------- CHANNEL
  const channel = createChannel({
     data: [
      {content: AboutPreview, id: 'about'},
      {content: ColorPreview, id: 'colors'},
      {content: TypographyPreview, id: 'typography'},
      {content: UtilityPreview, id: 'utilities'},
      {content: StorePreview, id: 'store'}
    ]
  }) 
  //---------------------------   
  
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

<HashWatch onChange={hashWatch} />

<ThemeWrapper {theme} {themeWatch} lock>
    <Container offset={theme === 'dark' ? 2 : 0}>
      <div class='home-page'>
        
        <Header {...headercopy} showCenter={channel.current === 0} showFooter={channel.current === 0} />

        <div class='home-section'>
          <div class='button-nav'>
            <Button size={$isMobile ? 'small' : null} type='magic' disabled={channel.current === 0} href={`${rootUrl}about`} onClick={() => {channel.current = 0}}>About</Button>
            <Button size={$isMobile ? 'small' : null} type='secondary' disabled={channel.current === 1} href={`${rootUrl}colors`} onClick={() => {channel.current = 1}}>Colors</Button>
            <Button size={$isMobile ? 'small' : null} type='success' disabled={channel.current === 2} href={`${rootUrl}typography`} onClick={() => {channel.current = 2}}>Typography</Button>
            <Button size={$isMobile ? 'small' : null} type='black' disabled={channel.current === 3}  href={`${rootUrl}utilities`} onClick={() => {channel.current = 3}}>Utilities</Button>
            <Button size={$isMobile ? 'small' : null} type='danger' disabled={channel.current === 4}  href={`${rootUrl}store`} onClick={() => {channel.current = 4}}>Stores</Button>
          </div>
          
          
          <Channels nopadding {...channel} />              
          
        </div>
      </div>
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
  