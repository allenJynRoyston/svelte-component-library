<script lang='ts'>
  import {getContext} from 'svelte';
  import { createChannel, capitalizeStr } from '@js/utility'

  import Header from '@components/Header/Header.svelte'
  import ColumnLayout from '@components/Layout/ColumnLayout.svelte'
  import Channels from '@components/Channels/Channels.svelte'
  import HashWatch from '@components/URLWatcher/HashWatch.svelte'
  import ThemeWrapper from '@components/ThemeWrapper/ThemeWrapper.svelte'
  import Container from '@components/Container/Container.svelte'

  import AccordionAlias from '@lib/_accordion.svelte'  
  import ButtonAlias from '@lib/_button.svelte'
  import HeaderAlias from '@lib/_header.svelte'
  import FooterAlias from '@lib/_footer.svelte'
  import LoaderAlias from '@lib/_loader.svelte'
  import ProductCard from '@lib/_productcard.svelte'
  import LinkAlias from '@lib/_link.svelte'
  import FormAlias from '@lib/_formExample.svelte'
  import SearchAlias from '@lib/_search.svelte'
  import HashWatchAlias from '@lib/_hashwatch.svelte'
  import SVGAlias from '@lib/_svg.svelte'
  import ThreeSlotAlias from '@lib/_threeslot.svelte'
  import TwoSlotAlias from '@lib/_twoslot.svelte'
  import ChannelAlias from '@lib/_channels.svelte'
  import ChannelButtonAlias from '@lib/_channelbutton.svelte'
  import GridLayoutAlias from '@lib/_gridLayout.svelte'
  import ColumnLayoutAlias from '@lib/_columnLayout.svelte'
  import ShoppingCartAlias from '@lib/_shoppingCart.svelte'
  import IndexDBAlias from '@lib/_idb.svelte'
  import SnackbarAlias from '@lib/_snackbar.svelte'
  
  import CodeBlockAlias from '@lib/_codeblock.svelte'
  import SplashAlias from '@lib/_splash.svelte'
  import NavBarAlias from '@lib/_navBar.svelte'
  import ThemeWrapperAlias from '@lib/_themewrapper.svelte'
  import ProfileCardAlias from '@lib/_profilecard.svelte'
  import ContainerAlias from '@lib/_container.svelte'
  import InnerContainerAlias from '@lib/_innerContainer.svelte'
  import SectionAlias from '@lib/_section.svelte'
  import ColorTextAlias from '@lib/_colortext.svelte'
  import ModalAlias from '@lib/_modal.svelte'
  import TabsAlias from '@lib/_tabs.svelte'
  import PromptAlias from '@lib/_prompt.svelte'
  import LoremBlockAlias from '@lib/_loremBlock.svelte'

  import ExampleForm from '@lib/_formExample.svelte'
  import InputAlias from '@lib/_input.svelte'  
  import FileInputAlias from '@lib/_fileInput.svelte'  
  import InputCheckboxAlias from '@lib/_inputCheckbox.svelte'  
  import TextareaAlias from '@lib/_textarea.svelte'  
  import InputDateAlias from '@lib/_inputDate.svelte'  
  import InputTimeAlias from '@lib/_inputTime.svelte'  
  import RatingAlias from '@lib/_rating.svelte'  
  import SelectAlias from '@lib/_select.svelte'  
  import SelectMultiAlias from '@lib/_selectMulti.svelte'    

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
    {content: HashWatchAlias, id: 'hashwatch', section: 'RootComponents'},
    {content: IndexDBAlias, id: 'indexdb', section: 'RootComponents'},
    {content: ModalAlias, id: 'modal', section: 'RootComponents'},
    {content: SnackbarAlias, id: 'snackbar', section: 'RootComponents'},

    {content: ExampleForm, id: 'exampleform', section: 'Form'},
    {content: InputAlias, id: 'input', section: 'Form'},
    {content: FileInputAlias, id: 'fileinput', section: 'Form'},
    {content: InputCheckboxAlias, id: 'inputcheckbox', section: 'Form'},
    {content: TextareaAlias, id: 'textarea', section: 'Form'},
    {content: InputDateAlias, id: 'inputdate', section: 'Form'},
    {content: InputTimeAlias, id: 'inputtime', section: 'Form'},
    {content: RatingAlias, id: 'rating', section: 'Form'},
    {content: SelectAlias, id: 'select', section: 'Form'},
    {content: SelectMultiAlias, id: 'selectmulti', section: 'Form'},    


    {content: HeaderAlias, id: 'header'},
    {content: FooterAlias, id: 'footer'},
    {content: ButtonAlias, id: 'button'},
    {content: LoaderAlias, id: 'loader'},
    {content: AccordionAlias, id: 'accordion'},    
    {content: ProductCard, id: 'productcard'},
    {content: LinkAlias, id: 'link'},
    {content: FormAlias, id: 'form'},
    {content: SearchAlias, id: 'search'},
    {content: SVGAlias, id: 'svg'},
    {content: ThreeSlotAlias, id: 'threeslot'},
    {content: TwoSlotAlias, id: 'twoslot'},
    {content: ChannelAlias, id: 'channels'},
    {content: ChannelButtonAlias, id: 'channelbutton'},
    {content: GridLayoutAlias, id: 'gridlayout'},
    {content: ColumnLayoutAlias, id: 'columnlayout'},
    {content: ShoppingCartAlias, id: 'shoppingcart'},
    {content: CodeBlockAlias, id: 'codeblock'},  
    {content: SplashAlias, id: 'splash'},    
    {content: NavBarAlias, id: 'navbar'},    
    {content: ThemeWrapperAlias, id: 'themewrapper'}, 
    {content: ProfileCardAlias, id: 'profilecard'},  
    {content: ContainerAlias, id: 'container'},
    {content: InnerContainerAlias, id: 'innercontainer'},
    {content: SectionAlias, id: 'section'},
    {content: ColorTextAlias, id: 'colortext'},    
    {content: TabsAlias, id: 'tabs'},
    {content: PromptAlias, id: 'prompt'},
    {content: LoremBlockAlias, id: 'loremblock'}
  ]})   


  const links = channel.data.map(({id, section = 'components'}) => {
    return {section, title: id, href: `${location.hash}&component=${id}&section=${section.toLowerCase()}`}
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

<ThemeWrapper {theme} {themeWatch} lock>
  <Container offset={1}>
    <HashWatch onChange={onChange}/>

    <Header {...headercopy} showFooter showLayoutButton />

    <ColumnLayout {links} currentIndex={channel.current} watchParam='section' hidebtn >
      <Channels {...channel} animate />
    </ColumnLayout>
  </Container>
</ThemeWrapper>

