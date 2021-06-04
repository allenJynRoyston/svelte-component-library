<script lang='ts'>
  import {getContext} from 'svelte';
  import { createChannel, capitalizeStr } from '@js/utility'

  import Header from '@layout/Header.svelte'
  import ColumnLayout from '@layout/ColumnLayout.svelte'
  import Channels from '@base/Channels.svelte'
  import HashWatch from '@core/HashWatch.svelte'
  import ThemeWrapper from '@layout/ThemeWrapper.svelte';
  import Container from '@layout/Container.svelte'

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

  <Header {...headercopy} showFooter  />

  <ColumnLayout {links}  >
    <Channels {...channel} animate />
  </ColumnLayout>
</Container>

