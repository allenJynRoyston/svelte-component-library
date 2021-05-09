<script lang='ts'>
  //---------------------------
  import {tick, onMount, getContext} from 'svelte'
  import Form from '../Form/Form.svelte'

  export let viewerId = null
  export let friendStatus = null;

  const indexdb = getContext('indexdb')

  let ready = false;
  let loginAsProps = {}
  let mimicAsProps = {}
  let friendStatusProps = {}
  //---------------------------

  //---------------------------
  onMount(async() => {
    await setupMockUsers()

    const options = await setupMockUsers() || []    

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

  //---------------------------
  const setupMockUsers = () => {
    return new Promise(async(resolve) => {
      resolve(await indexdb.getAll('users'))    
    })
  }


  // const clearTestData = () => {
  //   // @ts-ignore
  //   indexdb.clear('posts')
  //   // @ts-ignore
  //   indexdb.clear('images')
  //   // @ts-ignore
  //   indexdb.clear('users')
  //   // @ts-ignore
  //   indexdb.clear('comments')    
    
  //   window.localStorage.clear()         
          
  //   alert("clear test data.")
  //   location.reload()
  // }
  //---------------------------

  
</script>


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