<script lang='ts'>
  import { createChannel } from '@js/utility'
  import {DeviceStore} from '@store/store';

  import HashWatch from '@core/HashWatch.svelte'

  import Header from '@layout/Header.svelte'
  import ColumnLayout from '@layout/ColumnLayout.svelte' 
  import Channels from '@base/Channels.svelte'
  import Container from '@layout/Container.svelte'

  import AccordionAlias from '@lib/_accordion.svelte'  
  import ButtonAlias from '@lib/_button.svelte'
  import HeaderAlias from '@lib/_header.svelte'
  import FooterAlias from '@lib/_footer.svelte'
  import LoaderAlias from '@lib/_loader.svelte'
  import ProductCard from '@lib/_productcard.svelte'
  import LinkAlias from '@lib/_link.svelte'
  import FormExampleAlias from '@lib/_formExample.svelte'
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
  import LoremBlockAlias from '@lib/_loremBlock.svelte'

  import FormBuilderAlias from '@lib/_form.svelte';
  import InputAlias from '@lib/_input.svelte'  
  import FileInputAlias from '@lib/_fileInput.svelte'  
  import InputCheckboxAlias from '@lib/_inputCheckbox.svelte'  
  import TextareaAlias from '@lib/_textarea.svelte'  
  import InputDateAlias from '@lib/_inputDate.svelte'  
  import InputTimeAlias from '@lib/_inputTime.svelte'  
  import RatingAlias from '@lib/_rating.svelte'  
  import SelectAlias from '@lib/_select.svelte'  
  import SelectMultiAlias from '@lib/_selectMulti.svelte'  
  
  import FullImageAlias from '@lib/_fullImage.svelte'
  import RImageAlias from '@lib/_rimage.svelte'


  export let headerprops;
  const headercopy:any = {...headerprops}
  if(!!headercopy?.notchEle){
    headerprops.notchEle.props = {showSearch: true}
  }  

  const {isTabletAndBelow} = DeviceStore

  //--------------------------- CHANNEL
  const channel = createChannel({    
    sort: true,
    sortBy: 'id',
    data: [    
    // CORE
    {content: HashWatchAlias, id: 'hashwatch', section: '@Core'},
    {content: IndexDBAlias, id: 'indexdb', section: '@Core'},
    {content: ModalAlias, id: 'modal', section: '@Core'},
    {content: SnackbarAlias, id: 'snackbar', section: '@Core'},

    // FORM
    {content: FormBuilderAlias, id: 'formbuilder', section: '@Form'},    
    {content: InputAlias, id: 'input', section: '@Form'},
    {content: FileInputAlias, id: 'fileinput', section: '@Form'},
    {content: InputCheckboxAlias, id: 'inputcheckbox', section: '@Form'},
    {content: TextareaAlias, id: 'textarea', section: '@Form'},
    {content: InputDateAlias, id: 'inputdate', section: '@Form'},
    {content: InputTimeAlias, id: 'inputtime', section: '@Form'},
    {content: RatingAlias, id: 'rating', section: '@Form'},
    {content: SelectAlias, id: 'select', section: '@Form'},
    {content: SelectMultiAlias, id: 'selectmulti', section: '@Form'},    
    
    // EXAMPLES
    {content: FormExampleAlias, id: 'formexample', section: '@Examples'},

    // LAYOUT
    {content: HeaderAlias, id: 'header', section: '@Layout'},
    {content: FooterAlias, id: 'footer', section: '@Layout'},
    {content: GridLayoutAlias, id: 'gridlayout', section: '@Layout'},
    {content: ColumnLayoutAlias, id: 'columnlayout', section: '@Layout'},
    {content: NavBarAlias, id: 'navbar', section: '@Layout'},    
    {content: SectionAlias, id: 'section', section: "@Layout"},
    {content: ContainerAlias, id: 'container', section: "@Layout"},
    {content: SplashAlias, id: 'splash', section: "@Layout"},
    {content: ThemeWrapperAlias, id: 'themewrapper', section: "@Layout"},

    // SHOPPING
    {content: ShoppingCartAlias, id: 'shoppingcart', section: '@Shopping'},

    // CARDS
    {content: ProfileCardAlias, id: 'profilecard', section: '@Cards'},  
    {content: ProductCard, id: 'productcard', section: '@Cards'}, 

    // BASE
    {content: ButtonAlias, id: 'button', section: "@Base"},
    {content: LoaderAlias, id: 'loader', section: "@Base"},
    {content: AccordionAlias, id: 'accordion', section: "@Base"},
    {content: LinkAlias, id: 'link', section: "@Base"},
    {content: SearchAlias, id: 'search', section: "@Base"},
    {content: SVGAlias, id: 'svg', section: "@Base"},
    {content: ThreeSlotAlias, id: 'threeslot', section: "@Base"},
    {content: TwoSlotAlias, id: 'twoslot', section: "@Base"},
    {content: ChannelAlias, id: 'channels', section: "@Base"},
    {content: ChannelButtonAlias, id: 'channelbutton', section: "@Base"},
    {content: CodeBlockAlias, id: 'codeblock', section: "@Base"},
    {content: InnerContainerAlias, id: 'innercontainer', section: "@Base"},
    {content: ColorTextAlias, id: 'colortext', section: "@Base"},
    {content: TabsAlias, id: 'tabs', section: "@Base"},
    {content: LoremBlockAlias, id: 'loremblock', section: "@Base"},

    // IMAGES 
    {content: FullImageAlias, id: 'fullimage', section: "@Images"},
    {content: RImageAlias, id: 'rimage', section: "@Images"},    
  ]})   


  const links = channel.data.map(({id, section = '@Unslotted', order = 0}) => {
    return {section, title: id, href: `#components?page=library&section=${section.toLowerCase()}&component=${id}`}
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

  <Header {...headercopy} showFooter showBurgerMenuButton />

  <ColumnLayout {links} watchParam='section'  >
    <Channels {...channel} animate={!$isTabletAndBelow} disableAnimationOnMobile />
  </ColumnLayout>
</Container>

