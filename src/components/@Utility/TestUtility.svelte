<script lang='ts'>
  //---------------------------
  import {onMount, getContext} from 'svelte'
  import Form from '@form/FormBuilder.svelte'
  // import LocalStorageWatch from '../../components-db/LocalStorageWatch.svelte'

  export let viewerId = null
  export let friendStatus = null;

  const indexdb:any = getContext('indexdb')

  let ready = false;
  let loginAsProps = {}
  let mimicAsProps = {}
  let friendStatusProps = {}
  
  //---------------------------

  //---------------------------
  onMount(async() => {    
    const options = await indexdb.getAll('users') || []

    loginAsProps = {
      formData: [
        {
          renderAs: 'select', 
          label: 'You are:',     
          key: 'loginAs',      
          value: 0,
          defaultOption: 'Select an option',
          /* @ts-ignore */
          options: options.map(x => {
            x.title = `${x.firstName} ${x.lastName} | ${x._id}`
            return x
          }),
          onInitFilter: (val, options) => {                  
            // return loggedIn ? options.find(x => x._id === myDetails._id) : null
          },        
          onChange: (val) => {    
            // window.localStorage.setItem('me', JSON.stringify(val))     
            // location.reload()
          },     
        }  
      ]
    }  

    mimicAsProps = {
      formData: [
        {
          renderAs: 'select', 
          label: 'Viewing:',     
          key: 'loginAs',      
          value: 0,
          defaultOption: 'Select an option',
          options: options.map(x => {
            x.title = `${x.firstName} ${x.lastName} | ${x._id}`
            return x
          }),
          onInitFilter: (val, options) => {                 
            // return viewerId ? options.find(x => x._id === viewerId) : null
          },        
          onChange: (val) => {    
            // window.localStorage.setItem('viewing', JSON.stringify(val))     
            // location.reload()
          },     
        }  
      ]
    }

    friendStatusProps = {
      formData: [
        {
          renderAs: 'select', 
          label: 'We are:',     
          key: 'loginAs',      
          value: 0,
          defaultOption: 'Select an option',
          options: [
            {title: 'friends'}, 
            {title: 'not_friends'}, 
            {title: 'pending_request'}
          ],
          onInitFilter: (val, options) => {                  
            // return loggedIn ? options.find(x => x.title === friendStatus)  : null
          },        
          onChange: (val) => {    
            // window.localStorage.setItem('friendstatus', JSON.stringify(val))     
            // location.reload()
          },     
        }  
      ]
    }      

    ready = true
  })


  //---------------------------  LOCALSTORAGE 
  let loginData = null;
  const onFetch = ({success, data}) => {
    loginData = success ? data : null;
    console.log(loginData)
  }
  //---------------------------     

  
</script>


<!-- <LocalStorageWatch key='login' {onFetch}/> -->


{#if ready}
  <div class='testutility-container'>
    <div class='item'>
      <Form {...loginAsProps} />    
      <Form {...mimicAsProps} />    
      <Form {...friendStatusProps} />    
    </div>
  </div>
{/if}

<style lang='scss'>
  .testutility-container{
    width: 100%;

    .item{
      display: flex; 
      justify-content: flex-start      
    }

  }
</style>