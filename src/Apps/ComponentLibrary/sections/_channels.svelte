<script>
  import Channels from '../../../components/Channels/Channels'
  import LibraryBlock from './__LibraryBlock'
  import LoremBlock from '../../../components/LoremBlock/LoremBlock'

  const channelProps = {
     data: [
      {content: LoremBlock, render: false, active: false},
      {content: LoremBlock, render: false, active: false},
      {content: LoremBlock, render: false, active: false},
      {content: LoremBlock, render: false, active: false},
      {content: LoremBlock, render: false, active: false},
      {content: LoremBlock, render: false, active: false},
      {content: LoremBlock, render: false, active: false},
      {content: LoremBlock, render: false, active: false},
      {content: LoremBlock, render: false, active: false},
      {content: LoremBlock, render: false, active: false},
    ],
    current: 0,
    transition: {
      ease: 'cubicOut',
      speed: 400
    },
    channelReady: (index) => {
      channelProps.data = channelProps.data.map((x, i) => {
        x.active = false;

        if(i === index){
          x.render = true
          x.active = true
        }

        return x
      })      
    },
    afterUpdate: () => {}
  }   
  

</script>

<h2>Channels</h2>
<hr>
<LibraryBlock section>
  <div>
    <Channels buttons {...channelProps} />
  </div>
</LibraryBlock>   