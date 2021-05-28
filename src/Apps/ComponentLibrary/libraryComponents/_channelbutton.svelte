<script lang='ts'>
  	import LibrarySnippet from './../components/LibrarySnippet.svelte';

    import ChannelButton from '@components/ChannelButton/ChannelButton.svelte'

    let propstr = '';
    let selectstr = '';
    let inputstr = '';
    let props; 
    let selectprops;
    let inputprops;

    const svgs = [
    'dots',
    'home',
    'spinner',
    'cogs',
    'fire',
    'usertie',
    'search',
    'cross',
    'globe',
    'image',
    'star-full',
    'star-empty',
    'comments',
    'chain',
    'chainbroken',
    'plus',
    'minus',
    'checkbox-unchecked',
    'checkbox-checked',
    'locked',
    'unlocked',
    'file-text',
    'youtube',
    'like',
    'dislike',
    'love',
    'camera',
    'save',
    'grid-small',
    'grid-large',
    'showcase',
    'arrow-left',
    'arrow-right',
    'edit',
    'bin',
    'display',
    'play',
    'friend',
    'list',
    'bell',
    'people',
    'shield',
    'edit',
    'link',
    'flag',
    'post',
    'checkmark',
    'happy',
    'sad',
    'angry',
    'wink',
    'shocked',
    'crying',
    'baffled',
    'bullhorn',
    'circleup',
    'warning',
    'notification',
    'email',
    'instagram',
    'linkedin',
    'conversation',
    'globe2',
    'share',
    'stats',
    'upload',
    'menu',
    'hashtag',
    'refresh'
  ]      

    const snippet = {
    name: 'ChannelButton',
    importName: '@components/ChannelButton/ChannelButton.svelte',
    props: {
      rounded: false,
      nomargin: false
    }, 
    dropdowns: [
      {
        label: 'type',
        options: [null, 'primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white'], 
        value: 0        
      },
      {
        label: 'leftIcon',
        options: [null, ...svgs], 
        value: 0        
      },  
      {
        label: 'rightIcon',
        options: [null, ...svgs], 
        value: 0        
      },            
      {
        label: 'iconSize',
        options: [18, 24, 30, 36], 
        value: 0        
      }      
    ],
    inputs: [
      {forprop: 'content', renderAs: 'input', componentprop: {type: 'text'}, value: 'Some button text' },
      {forprop: 'style', renderAs: 'input', componentprop: {type: 'text'}, value: 'margin-bottom: 100px' }
    ]    
  }

  $: livecode = `    
    <ChannelButton${propstr}${selectstr}${inputstr} />
     `  


</script>
<LibrarySnippet {...snippet} {livecode} bind:propstr={propstr} bind:selectstr={selectstr} bind:inputstr={inputstr} bind:props={props} bind:selectprops={selectprops} bind:inputprops={inputprops} >
  <div slot='liveexample'>    

    <ChannelButton {...props} {...selectprops} {...inputprops}>
      
    </ChannelButton>    
   </div>    
</LibrarySnippet>


