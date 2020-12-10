<script>
  import {Form} from '../index'


  let formData = [
    {
      renderAs: 'input',      
      label: 'Username',
      placeholder: 'john smith',
      key: 'username',
      value: 'johnsmith', 
      regex: /^[a-zA-Z]+$/,
      required: true,
      minLength: 3,
      maxLength: 10
    },
    {
      renderAs: 'input', 
      type: 'password', 
      label: 'Password',
      key: 'password',
      value: 'notapassword',
      required: true
    },
    {
      renderAs: 'textarea', 
      type: 'description', 
      label: 'Description',
      key: 'description',
      value: 'blah blah blah blah',
      required: true
    }        
  ]

  const onSubmit = (e) => {
    console.log(e)
  }

</script>

<style lang='scss' scoped>

</style>


<Form {formData} {onSubmit} />
