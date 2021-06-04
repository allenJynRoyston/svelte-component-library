<script lang='ts'>
  //--------------------------- IMPORTS  
  import {getContext} from 'svelte'
  import Form from '@form/FormBuilder.svelte'
  import SVG from '@base/SVG.svelte'
  import MoodSelector from '../MoodSelector/MoodSelector.svelte'
  import ThreeSlot from '@base/ThreeSlot.svelte'
  import UserPortrait from '../UserPortrait/UserPortrait.svelte'
  import MoodPortrait from '../MoodPortrait/MoodPortrait.svelte'

  //--------------------------- COMPONENT PROPS
  export let isBusy;
  export let defaultMood = null;
  export let key = 'createNew';  
  export let content = '';
  export let allowMood = true;
  export let showUser = true;
  export let style = null;
  export let render = true;
  export let currentEmotion = null;
  export let requireClickToActivate = false;
  export let permissions =  {
    allowView: {
      friends: true,
      anybody: false
    },      
    allowShare: {
      friends: true,
      anybody: false
    },
    allowComments: {
      friends: true,
      anybody: false
    },
    allowEmotes: {
      friends: true,
      anybody: false
    },
  }
  
  export let onSubmit = (e) => {return e}
  
  //---------------------------

  //--------------------------- VARS   
  const myDetails = getContext('myDetails')
  let mood = defaultMood
  let activate = requireClickToActivate;

  const formProps = {
    formData: [
      {
        renderAs: 'textarea', 
        key: 'textarea',      
        value: content,
        required: true,
        contentEdit: true,
      }    
    ],
    onSubmit: (e) => {
      // @ts-ignore
      onSubmit({
        permissions,
        value: e[0].value,
        mood
      })      
    },
    padding: 20,
    localStorageKey: key,
    clearLocalStorage: true
  }    
  
  
  const anybodyPermissions = {
    formData: [
      {
        renderAs: 'checkbox', 
        key: 'a1',
        text: 'View',
        value: permissions.allowView.anybody,
        onChange: (val) => {
          permissions.allowView.anybody = val
        },
        sizing: {
          desktop: 25,
          mobile: 50
        }        
      },  
      {
        renderAs: 'checkbox', 
        key: 'a2',
        text: 'Share',
        value: permissions.allowShare.anybody,
        onChange: (val) => {
          permissions.allowShare.anybody = val
        },
        sizing: {
          desktop: 25,
          mobile: 50
        }         
      },        
      {
        renderAs: 'checkbox', 
        key: 'a3',
        text: 'Emote',
        value: permissions.allowEmotes.anybody,
        onChange: (val) => {
          permissions.allowEmotes.anybody = val
        },
        sizing: {
          desktop: 25,
          mobile: 50
        }         
      },           
      {
        renderAs: 'checkbox', 
        key: 'a4',
        text: 'Comment',
        value: permissions.allowComments.anybody,
        onChange: (val) => {
          permissions.allowComments.anybody = val
        },
        sizing: {
          desktop: 25,
          mobile: 50
        }          
      },                   
    ]
  }


  const friendPermissions = {
    formData: [
      {
        renderAs: 'checkbox', 
        key: 'f1',
        text: 'View',
        value: permissions.allowView.friends,
        onChange: (val) => {
          permissions.allowView.friends = val
        },
        sizing: {
          desktop: 25,
          mobile: 50
        }        
      }, 
      {
        renderAs: 'checkbox', 
        key: 'f2',
        text: 'Share',
        value: permissions.allowShare.friends,
        onChange: (val) => {
          permissions.allowShare.friends = val
        },
        sizing: {
          desktop: 25,
          mobile: 50
        }         
      },       
      {
        renderAs: 'checkbox', 
        key: 'f3',
        text: 'Emote',
        value: permissions.allowEmotes.friends,
        onChange: (val) => {
          permissions.allowEmotes.friends = val
        },
        sizing: {
          desktop: 25,
          mobile: 50
        }          
      },         
      {
        renderAs: 'checkbox', 
        key: 'f4',
        text: 'Comment',
        value: permissions.allowComments.friends,
        onChange: (val) => {
          permissions.allowComments.friends = val
        },
        sizing: {
          desktop: 25,
          mobile: 50
        }          
      },  
                   
    ]
  }  

  
  //--------------------------- FN
  const updateMood = (_mood) => {
    mood = _mood
  }
  //---------------------------   

  const formStyle = `border: none; padding: 0; width: calc(100% - 5px)`
  const optionStyle = `display: flex; flex-direction: column; justify-content: flex-start;`


</script>


<div class='createpost' class:busy={isBusy} {style}>

  {#if isBusy}
    <div class='createpost__overlay' >
      <SVG icon='save' />
    </div>  
  {/if}


  <ThreeSlot style={'margin-bottom: 10px'}>
    <div slot='left'>
      {#if showUser}
        <UserPortrait userId={myDetails._id} rounded={true} />      
      {/if}
    </div>

    <slot name='header' >
      {#if showUser}      
        <p>
          Replying...
        </p>  
      {/if}
    </slot>

    <div slot='right' style='display: flex'>
      {#if allowMood}
        <MoodSelector userId={myDetails._id} onClick={updateMood} />
      {/if}
    </div>
  </ThreeSlot>


  <div style='display: flex'>
    <MoodPortrait userId={myDetails._id} currentEmotion={mood || currentEmotion}/>      
    {#if render}
      <Form {...formProps} style={formStyle} >    
        <div slot='options' style={optionStyle}>         
          <div style='display: flex;'>
            <small style='width: 200px'>Friends <b>can</b>:</small> <Form {...friendPermissions} style={'border: none; padding: 0; width: 100%;'} showButton={false} />
          </div>
          <div style='display: flex;'>
            <small style='width: 200px'>Strangers <b>can</b>:</small>  <Form {...anybodyPermissions} style={'border: none; padding: 0; width: 100%;'} showButton={false} />
          </div>
        </div>          
        <slot>
          Smash
        </slot>
      </Form>
    {/if}
  </div>


</div>


<style lang='scss'>
  .createpost{
    padding: 10px;
    position: relative;

    &__overlay{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
      z-index: 2;
      cursor: not-allowed;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__activate{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      cursor: pointer;      
    }

    &.busy{
      opacity: 0.5;
    }

  }



</style>