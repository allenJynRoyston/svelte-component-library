<script lang='ts'>
  import {getContext} from 'svelte';
  import Footer from '@components/Footer/Footer.svelte'
  import TwoSlot from '@components/TwoSlot/TwoSlot.svelte'
  import Section from '@components/Section/Section.svelte'
  import ColorText from '@components/ColorText/ColorText.svelte'
  import Accordian from '@components/Accordion/Accordion.svelte'

  const fonts:any = getContext('fonts');

  const phrase = 'The quick brown fox jumps over the lazy dog.'

  const classes = ['primary', 'secondary', 'magic', 'success', 'warning', 'danger']

</script>

<Section>
  <section>
    <h1>
      Typography:
    </h1>
    <hr>
    <br><br>

    <Accordian open full>
      <div slot='title'>
        <h2>Font Family:</h2>                   
      </div>

      <div slot='content'>
        <Section>
          {#each fonts as font, index}
            <TwoSlot>
              <div slot='left' class='title'>{font}</div>
              <div slot='right'>
                <span class={index === 0 ? 'font-one' : 'font-two'}>
                  {phrase} 
                </span>
              </div>
            </TwoSlot>
            {#if index < fonts.length - 1}
              <hr>
            {/if}      
          {/each}  
        </Section>      
      </div>
    </Accordian> 

    <Accordian open full>
      <div slot='title'>
        <h2>Colors:</h2>                   
      </div>

      <div slot='content'>
        <Section>
          {#each classes as _class, index}
            <TwoSlot>
              <div slot='left' class='title'>
                <ColorText applyTheme={_class}>
                  {_class} 
                </ColorText>

              </div>
              <div slot='right'>
                <ColorText applyTheme={_class}>
                  {phrase} 
                </ColorText>
                <ColorText applyTheme={_class}>
                  <h3>{phrase} </h3>
                </ColorText>          
              </div>
            </TwoSlot>
            {#if index < classes.length - 1}
              <hr>
            {/if}      
          {/each}       
        </Section>
      </div>
    </Accordian> 

    <Accordian open full>
      <div slot='title'>
        <h2>h1-h5:</h2>                   
      </div>

      <div slot='content'>
        <Section>
          <TwoSlot >
            <div slot='left' class='title'>h1:</div>
            <div slot='right'>
              <h1 class='font-one'>
                {phrase}
              </h1>
            </div>
          </TwoSlot>
          <hr>
          <TwoSlot >
            <div slot='left' class='title'>h2:</div>
            <div slot='right'>
              <h2>
                {phrase}
              </h2>
            </div>
          </TwoSlot>
          <hr>
          <TwoSlot >
            <div slot='left' class='title'>h3:</div>
            <div slot='right'>
              <h3>
                {phrase}
              </h3>
            </div>
          </TwoSlot> 
          <hr>
          <TwoSlot >
            <div slot='left' class='title'>h4:</div>
            <div slot='right'>
              <h4>
                {phrase}
              </h4>
            </div>
          </TwoSlot> 
          <hr>
          <TwoSlot >
            <div slot='left' class='title'>h5:</div>
            <div slot='right'>
              <h5>
                {phrase}
              </h5>
            </div>
          </TwoSlot>     
        </Section>    
      </div>
    </Accordian> 

    <Accordian open full>
      <div slot='title'>
        <h2>p, span, a, body, em, strong:</h2>                   
      </div>

      <div slot='content'>
        <Section>
          <TwoSlot >
            <div slot='left' class='title'>p:</div>
            <div slot='right'>
              <p>
                {phrase}
              </p>
            </div>
          </TwoSlot>  
          <hr>
          <TwoSlot >
            <div slot='left' class='title'>span:</div>
            <div slot='right'>
              <span>
                {phrase}
              </span>
            </div>
          </TwoSlot>  
          <hr>
          <TwoSlot >
            <div slot='left' class='title'>a:</div>
            <div slot='right'>
              <a href={`${location.hash}`}>
                {phrase}
              </a>
            </div>
          </TwoSlot>  
          <hr>
          <TwoSlot >
            <div slot='left' class='title'>body:</div>
            <div slot='right'>        
              {phrase}        
            </div>
          </TwoSlot>  
          <hr>
          <TwoSlot >
            <div slot='left' class='title'>em:</div>
            <div slot='right'>      
              <em>
                {phrase}        
              </em>  
            </div>
          </TwoSlot>      
          <hr> 
          <TwoSlot >
            <div slot='left' class='title'>strong:</div>
            <div slot='right'>      
              <strong>
                {phrase}        
              </strong>  
            </div>
          </TwoSlot> 
        </Section>             
      </div>
    </Accordian> 

  </section>
</Section>

<Footer />



<style lang='scss'>
  @import "../../../scss/src/_media-queries.scss";

  .title{
    font-weight: 700;
    font-size: 16px;    
  }

  section{
    padding: 50px 0;
    max-width: 900px;
    margin: auto;

    @include tablet-landscape-and-below {
      padding: 20px 0;
    }

  }  

</style>