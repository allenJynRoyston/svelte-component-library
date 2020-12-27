<script>
  import {onMount} from 'svelte'
  import {Card, FormExample, FormLogin} from '../index'
  import {IndexDBStore} from '../../js/index'

  const onSubmit = (e) => {
    console.log(e)
  }

  onMount(async() => {
    const indexdb = new IndexDBStore('snappfireDB', 1);            
    const indexdbTables = ['users', 'posts', 'images', 'following']
    await indexdb.createTable(indexdbTables);


    // let _id = Math.random().toString(36).substring(7);
    // indexdb.add('posts', {_id, name: 'allen', age: 32}, true)
    // indexdb.add('posts', {_id, name: 'royston', age: 45}, true)

    // let data = await indexdb.get('posts', "zs7uk")
    // console.log(data)

  })


</script>

<style lang='scss' scoped>
  #app-wrapper{
    max-width: calc(800px - 40px);
    padding: 20px;
    margin: 0 auto;
  }
</style>

<!-- 
<Card>
  <FormExample idModifier={'a'} localStorageKey={'form_A'} clearLocalStorage={true} />
</Card>


<Card>
  <FormLogin idModifier={'b'} localStorageKey={'form_B'} clearLocalStorage={true} />
</Card> -->

<div id='app-wrapper'>

  <Card>
    <span slot='header'>Hello World</span>
    <FormLogin localStorageKey={'form_C'} clearLocalStorage={true} />
    <span slot='footer'>Hello World</span>
  </Card>

</div>


