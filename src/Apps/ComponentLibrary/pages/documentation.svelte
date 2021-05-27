<script lang='ts'>
  import {getContext} from 'svelte';
  import { createChannel, capitalizeStr } from '@js/utility'

  import Header from '@components/Header/Header.svelte'
  import ColumnLayout from '@components/Layout/ColumnLayout.svelte'
  import Channels from '@components/Channels/Channels.svelte'
  import HashWatch from '@components/URLWatcher/HashWatch.svelte'
  import ThemeWrapper from '@components/ThemeWrapper/ThemeWrapper.svelte'
  import Container from '@components/Container/Container.svelte'

  import HowToSnippet from '../documentationComponents/_howTo.svelte'


  export let headerprops;
  const headercopy:any = {...headerprops}
  if(!!headercopy?.notchEle){
    headerprops.notchEle.props = {showSearch: true}
  }

  const theme:string = getContext('theme');

  //--------------------------- CHANNEL
  const channel = createChannel({    
    sort: true,
    sortBy: 'id',
    data: [    
    {content: HowToSnippet, id: 'how-to', section: 'Getting Started'},
  ]})   


  const links = channel.data.map(({id, section = 'Unsorted'}) => {
    return {section, title: id, href: `${location.hash}&component=${id}`}
  }).sort((a, b) => a?.title.localeCompare(b?.title))


  let themeWatch = true;
  const onChange = ({params}) => {       
    const index = channel.data.findIndex(data => {
      return data?.id.toLowerCase() === params?.component
    }) 
    channel.current = index < 0 ? 0 : index
    themeWatch = false;
    setTimeout(() => {
      themeWatch = true;
    })
  }  
  //--------------------------- 


</script>

<Container offset={1}>
  <HashWatch onChange={onChange}/>

  <Header {...headercopy} showFooter showLayoutButton />

  <ColumnLayout {links} currentIndex={channel.current} hidebtn >
    <Channels {...channel} animate />
  </ColumnLayout>
</Container>

